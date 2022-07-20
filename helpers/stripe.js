const { selectCustomer } = require('../models/stripeCustomer')
const { selectSubscription } = require('../models/stripeSubscription')

const { STRIPE_SECRET_KEY } = process.env

const stripe = require('stripe')(STRIPE_SECRET_KEY)
const moment = require('moment')

const createCustomer = async function (name, email) {
    try {
        const customer = await stripe.customers.create({
            name,
            email,
        })
        return customer
    } catch {
        return null
    }
}

const listAllCustomers = async function () {
    try {
        const customers = await stripe.customers.list()
        return customers
    } catch {
        return null
    }
}

const deleteCustomer = async function (customerId) {
    try {
        const deleted = await stripe.customers.del(customerId)
        return deleted
    } catch {
        return null
    }
}

const setDefaultPaymentCard = async function (customerId, cardId) {
    try {
        const customer = await stripe.customers.update(
            customerId,
            {
                default_source: cardId,
            },
        )
        return customer
    } catch {
        return null
    }
}

const createProduct = async function (prodcuctName) {
    try {
        const product = await stripe.products.create({ name: prodcuctName })
        return product
    } catch {
        return null
    }
}

const listAllProducts = async function () {
    try {
        const products = await stripe.products.list()
        return products
    } catch {
        return null
    }
}

const deleteProduct = async function (prodcuctId) {
    try {
        const product = await stripe.products.del(prodcuctId)
        return product
    } catch {
        return null
    }
}

const createPrice = async function (nickname, unitAmount, productId) {
    try {
        const price = await stripe.prices.create({
            nickname,
            unit_amount: unitAmount,
            currency: 'usd',
            recurring: { interval: 'month' },
            product: productId,
        })
        return price
    } catch {
        return null
    }
}

const listAllPrices = async function () {
    try {
        const prices = await stripe.prices.list()
        return prices
    } catch {
        return null
    }
}

const updatePrice = async function (priceId, priceName) {
    try {
        const price = await stripe.prices.update(
            priceId,
            { nickname: priceName },
        )
        return price
    } catch {
        return null
    }
}

const addCard = async function (customerId, stripeToken) {
    try {
        const card = await stripe.customers.createSource(
            customerId,
            { source: stripeToken },
        )
        return card
    } catch {
        return null
    }
}

const deleteCard = async function (customerId, cardId) {
    try {
        const deleted = await stripe.customers.deleteSource(
            customerId,
            cardId,
        )
        return deleted
    } catch {
        return null
    }
}

const listAllCards = async function (customerId) {
    try {
        const cards = await stripe.customers.listSources(
            customerId,
            { object: 'card' },
        )
        return cards
    } catch {
        return null
    }
}

const retrieveCustomerInfo = async function (customerId) {
    const customer = await stripe.customers.retrieve(
        customerId,
    )
    return customer
}

const getSubscriptions = async function (customerId) {
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
        })
        return subscriptions
    } catch {
        return null
    }
}

const subscribe = async function (customerId, priceId, trailPeriods) {
    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [
                { price: priceId },
            ],
            trial_period_days: trailPeriods,
        })
        return subscription
    } catch {
        return null
    }
}

const subscribeChange = async function (subscriptionId, priceId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    if (subscription) {
        stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: false,
            proration_behavior: 'create_prorations',
            items: [{
                id: subscription.items.data[0].id,
                price: priceId,
            }],
        })
        return true
    }
    return false
}

const cancelSubscription = async function (subscriptionId) {
    try {
        const deleted = await stripe.subscriptions.del(subscriptionId)
        return deleted
    } catch {
        return null
    }
}

const endTrial = async function () {
}

const userHasPaymentMethod = async function (userId) {
    const result = await selectCustomer([userId])
    if (result?.rows?.length) {
        const customer = result.rows[0]
        const customerId = customer['customer_id']
        const cards = listAllCards(customerId)
        if (cards) {
            return cards.data.length
        }
        return false
    }
    return false
}

const userIsTrialPeriodSubscription = async function (userId) {
    const subscription = await getUserSubscription(userId)
    if (subscription) {
        const trialEndsAt = subscription['trial_ends_at']
        const isFuture = moment().isBefore(trialEndsAt)
        return trialEndsAt && isFuture
    }
    return false
}

const userIsCancelledSubscription = async function (userId) {
    const subscription = await getUserSubscription(userId)
    if (subscription) {
        const endsAt = subscription['ends_at']
        if (endsAt) {
            return true
        }
        return false
    }
    return false
}

const userIsEndedSubscription = async function (userId) {
    return userIsCancelledSubscription(userId) && !userIsOnGracePeriodSubscription(userId)
}

const userIsOnGracePeriodSubscription = async function (userId) {
    const subscription = await getUserSubscription(userId)
    if (subscription) {
        const endsAt = subscription['ends_at']
        const isFuture = moment().isBefore(endsAt)
        return endsAt && isFuture
    }
    return false
}

const getUserSubscription = async function (userId) {
    const result = await selectSubscription([userId])
    if (result?.rows?.length) {
        return result.rows[0]
    }
    return null
}

module.exports = {
    createCustomer,
    listAllCustomers,
    deleteCustomer,
    createProduct,
    listAllProducts,
    deleteProduct,
    createPrice,
    listAllPrices,
    updatePrice,
    setDefaultPaymentCard,
    addCard,
    listAllCards,
    deleteCard,
    retrieveCustomerInfo,
    getSubscriptions,
    subscribe,
    subscribeChange,
    cancelSubscription,
    endTrial,
    userHasPaymentMethod,
    userIsTrialPeriodSubscription,
    userIsCancelledSubscription,
    userIsEndedSubscription,
    userIsOnGracePeriodSubscription,
    getUserSubscription,
}
