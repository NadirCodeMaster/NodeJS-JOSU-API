const uuid = require('uuid')
const moment = require('moment')
const {
    createCustomer,
    retrieveCustomerInfo,
    addCard,
    deleteCard,
    listAllCards,
    listAllCustomers,
    deleteCustomer,
    createProduct,
    listAllProducts,
    deleteProduct,
    createPrice,
    listAllPrices,
    updatePrice,
    setDefaultPaymentCard,
    subscribe,
    getSubscriptions,
    subscribeChange,
    getUserSubscription,
    userIsEndedSubscription,
    userIsCancelledSubscription,
    cancelSubscription,
} = require('../../helpers/stripe')
const {
    insertCustomer,
    selectCustomer,
} = require('../../models/stripeCustomer')
const {
    addSubscription,
    updateSubscription,
} = require('../../models/stripeSubscription')

const addCustomer = async function (req, res, next) {
    const { name, email } = req.body.data
    const { user_id: userId } = req.params
    const customer = await createCustomer(name, email)
    if (customer) {
        const id = uuid.v4()
        await insertCustomer([userId, customer.id, name, id])
        res.locals.resource = `/v0/stripe/${userId}/customer`
        res.locals.payload = {
            id,
            user_id: userId,
            customer_id: customer.id,
            customer_name: name,
        }
    }
    return next()
}

const getCustomerInfo = async function (req, res, next) {
    const { user_id: userId } = req.params
    const customer = await getCustomerByUserId(userId)
    const stripeCoutomer = await retrieveCustomerInfo(customer.customer_id)
    res.locals.payload = stripeCoutomer
    return next()
}

const getAllStripeCustomers = async function (req, res, next) {
    const customers = await listAllCustomers()
    res.locals.payload = customers?.data
    return next()
}

const deleteStripeCustomer = async function (req, res, next) {
    const { customer_id: customerId } = req.params
    const customer = await deleteCustomer(customerId)
    res.locals.payload = customer
    return next()
}

const addProduct = async function (req, res, next) {
    const { name: productName } = req.body.data

    const product = await createProduct(productName)
    res.locals.payload = product
    return next()
}

const getAllStripeProducts = async function (req, res, next) {
    const products = await listAllProducts()
    res.locals.payload = products?.data
    return next()
}

const deleteStripeProduct = async function (req, res, next) {
    const { product_id: productId } = req.params
    const product = await deleteProduct(productId)
    res.locals.payload = product
    return next()
}

const addPrice = async function (req, res, next) {
    const { name: priceName, unit_amount: unitAmount, product_id: productId } = req.body.data

    const price = await createPrice(priceName, unitAmount, productId)
    res.locals.payload = price
    return next()
}

const getAllStripePrices = async function (req, res, next) {
    const prices = await listAllPrices()
    res.locals.payload = prices?.data
    return next()
}

const updateStripePrice = async function (req, res, next) {
    const { price_id: priceId } = req.params
    const { nickname } = req.body.data
    const price = await updatePrice(priceId, nickname)
    res.locals.payload = price
    return next()
}

const addPaymentMethod = async function (req, res, next) {
    const { customer_id: customerId, stripe_token: stripeToken } = req.body.data
    const card = await addCard(customerId, stripeToken)
    res.locals.payload = card
    return next()
}

const removePaymentMethod = async function (req, res, next) {
    const { user_id: userId, card_id: cardId } = req.params
    const customer = await getCustomerByUserId(userId)
    if (customer) {
        const customerId = customer['customer_id']
        const deleted = await deleteCard(customerId, cardId)
        res.locals.payload = deleted
    }
    return next()
}

const listAllPaymentMethods = async function (req, res, next) {
    const { user_id: userId } = req.params
    const result = await selectCustomer([userId])
    if (result?.rows?.length) {
        const customer = result.rows[0]
        const cards = await listAllCards(customer['customer_id'])
        res.locals.payload = cards?.data
    }
    return next()
}

const setDefaultPaymentMethod = async function (req, res, next) {
    const { user_id: userId, card_id: cardId } = req.params
    const customer = await getCustomerByUserId(userId)
    if (customer) {
        const customerId = customer['customer_id']
        const card = await setDefaultPaymentCard(customerId, cardId)
        res.locals.payload = card
    }
    return next()
}

const getUserSubscriptions = async function (req, res, next) {
    const { user_id: userId } = req.params
    const customer = await getCustomerByUserId(userId)
    if (customer) {
        const customerId = customer['customer_id']
        const subscriptions = await getSubscriptions(customerId)
        res.locals.payload = subscriptions?.data
    }
    return next()
}

const getUserSubscriptionInfo = async function (req, res, next) {
    const { user_id: userId } = req.params
    const subscription = await getUserSubscription(userId)
    res.locals.payload = subscription
    return next()
}

const subscribeToPlan = async function (req, res, next) {
    const { user_id: userId } = req.params
    const { price_id: priceId } = req.body.data
    const customer = await getCustomerByUserId(userId)
    if (customer) {
        const customerId = customer['customer_id']
        const subscription = await subscribe(customerId, priceId, 14)
        if (subscription) {
            const id = uuid.v4()
            await addSubscription([
                id,
                userId,
                'main',
                subscription.ended_at ? moment.unix(subscription.ended_at).format() : null,
                priceId,
                1,
                subscription.id,
                subscription.status,
                moment.unix(subscription.trial_end).format(),
            ])
        }
        res.locals.payload = subscription
    }
    return next()
}

const switchPlan = async function (req, res, next) {
    const { price_id: priceId } = req.body.data
    const { user_id: userId } = req.params
    const isEnded = await userIsEndedSubscription(userId)
    if (!isEnded) {
        const subscription = await getUserSubscription(userId)
        if (subscription) {
            const subscriptionId = subscription['subscription_id']
            const result = await subscribeChange(subscriptionId, priceId)
            if (result) {
                const customer = await getCustomerByUserId(userId)
                if (customer) {
                    const customerId = customer['customer_id']
                    const currentSubscriptions = await getSubscriptions(customerId)
                    if (currentSubscriptions) {
                        currentSubscriptions.data.map((currentSubscription) => {
                            if (currentSubscription.id === subscriptionId) {
                                updateSubscription([
                                    currentSubscription.ended_at
                                        ? moment.unix(currentSubscription.ended_at).format() : null,
                                    priceId,
                                    currentSubscription.id,
                                    currentSubscription.status,
                                    moment.unix(currentSubscription.trial_end).format(),
                                    subscription['id'],
                                    userId,
                                ])
                            }
                        })
                    }
                }
            }
        }
    }
    return next()
}

const cancel = async function (req, res, next) {
    const { user_id: userId } = req.params
    const subscription = await getUserSubscription(userId)
    if (subscription) {
        const subscriptionId = subscription['subscription_id']
        const cancelled = await userIsCancelledSubscription(userId)
        if (!cancelled) {
            const deleted = await cancelSubscription(subscriptionId)
            updateSubscription([
                deleted.ended_at
                    ? moment.unix(deleted.ended_at).format() : null,
                subscription['plan_id'],
                deleted.id,
                deleted.status,
                moment.unix(deleted.trial_end).format(),
                subscription['id'],
                userId,
            ])
        }
    }
    return next()
}

const endTrial = async function (req, res, next) {
    return next()
}

const getCustomerByUserId = async (userId) => {
    const result = await selectCustomer([userId])
    if (result?.rows?.length) {
        const customer = result.rows[0]
        return customer
    }
    return null
}

module.exports = {
    addCustomer,
    getCustomerInfo,
    deleteStripeCustomer,
    getAllStripeCustomers,
    addProduct,
    getAllStripeProducts,
    deleteStripeProduct,
    addPrice,
    getAllStripePrices,
    updateStripePrice,
    addPaymentMethod,
    listAllPaymentMethods,
    removePaymentMethod,
    setDefaultPaymentMethod,
    getUserSubscriptions,
    subscribeToPlan,
    switchPlan,
    cancel,
    endTrial,
    getUserSubscriptionInfo,
}
