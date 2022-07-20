const express = require('express')

const {
    addCustomer,
    getCustomerInfo,
    getAllStripeCustomers,
    deleteStripeCustomer,
    addProduct,
    getAllStripeProducts,
    deleteStripeProduct,
    addPrice,
    getAllStripePrices,
    updateStripePrice,
    listAllPaymentMethods,
    removePaymentMethod,
    setDefaultPaymentMethod,
    addPaymentMethod,
    subscribeToPlan,
    switchPlan,
    cancel,
    getUserSubscriptionInfo,
} = require('../controllers/users/stripe')

const { isAuthenticated } = require('../controllers/isAuthenticated')
const { logRequest } = require('../controllers/logging')

const stripeRouter = new express.Router()

/**
 * @swagger
 * /v0/stripe/{user_id}/customer:
 *   post:
 *     summary: Create Stripe Customer
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Customer'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Customer'
 *   get:
 *     summary: Get User Customer Info
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Customer'
 */
stripeRouter.post('/:user_id/customer', logRequest, isAuthenticated, addCustomer)
stripeRouter.get('/:user_id/customer', logRequest, isAuthenticated, getCustomerInfo)

/**
 * @swagger
 * /v0/stripe/{user_id}/customer/all:
 *   get:
 *     summary: Get All Registered Stripe Customers
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Stripe_Customers'
 */
stripeRouter.get('/:user_id/customer/all', logRequest, isAuthenticated, getAllStripeCustomers)

/**
 * @swagger
 * /v0/stripe/{user_id}/customer/{customer_id}:
 *   delete:
 *     summary: Delete Stripe Customer
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/StripeCustomerId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Delete_Stripe_Object'
 */
stripeRouter.delete('/:user_id/customer/:customer_id', logRequest, isAuthenticated, deleteStripeCustomer)

/**
 * @swagger
 * /v0/stripe/{user_id}/product:
 *   post:
 *     summary: Create Stripe Product
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Product'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Product'
 *   get:
 *     summary: Get All Registered Stripe Products
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Stripe_Products'
 */
stripeRouter.post('/:user_id/product', logRequest, isAuthenticated, addProduct)
stripeRouter.get('/:user_id/product', logRequest, isAuthenticated, getAllStripeProducts)

/**
 * @swagger
 * /v0/stripe/{user_id}/product/{product_id}:
 *   delete:
 *     summary: Delete Stripe Product
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/StripeProductId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Delete_Stripe_Object'
 */
stripeRouter.delete('/:user_id/product/:product_id', logRequest, isAuthenticated, deleteStripeProduct)

/**
 * @swagger
 * /v0/stripe/{user_id}/price:
 *   post:
 *     summary: Create Stripe Price
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Price'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Price'
 *   get:
 *     summary: Get All Registered Stripe Prices
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Stripe_Prices'
 */
stripeRouter.post('/:user_id/price', logRequest, isAuthenticated, addPrice)
stripeRouter.get('/:user_id/price', logRequest, isAuthenticated, getAllStripePrices)

/**
 * @swagger
 * /v0/stripe/{user_id}/price/{price_id}:
 *   put:
 *     summary: Update Stripe Price
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/StripePriceId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Price'
 */
stripeRouter.put('/:user_id/price/:price_id', logRequest, isAuthenticated, updateStripePrice)

/**
 * @swagger
 * /v0/stripe/{user_id}/card:
 *   post:
 *     summary: Add Payment Method
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Card'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Card'
 *   get:
 *     summary: Get All Registered Customer's Stripe Cards
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200_OK_Stripe_Cards'
 */
stripeRouter.get('/:user_id/card', logRequest, isAuthenticated, listAllPaymentMethods)
stripeRouter.post('/:user_id/card', logRequest, isAuthenticated, addPaymentMethod)

/**
 * @swagger
 * /v0/stripe/{user_id}/card/{card_id}:
 *   delete:
 *     summary: Delete Stripe Card
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/StripeCardId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Delete_Stripe_Object'
 *   put:
 *     summary: Set Default Payment Method
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/StripeCardId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Card'
 */
stripeRouter.delete('/:user_id/card/:card_id', logRequest, isAuthenticated, removePaymentMethod)
stripeRouter.put('/:user_id/card/:card_id', logRequest, isAuthenticated, setDefaultPaymentMethod)

/**
 * @swagger
 * /v0/stripe/{user_id}/subscribe:
 *   post:
 *     summary: Subscribe To Plan
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Subscribe'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Subscribe'
 *   put:
 *     summary: Upgrade/Downgrade Plan
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/Subscribe'
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Subscribe'
 *   get:
 *     summary: Get User's Subscription
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/202_OK_Subscribe'
 *   delete:
 *     summary: Cancel Subscription
 *     tags:
 *       - stripe
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       202:
 *         $ref: '#/components/responses/202_OK_Subscribe'
 */
stripeRouter.get('/:user_id/subscribe', logRequest, isAuthenticated, getUserSubscriptionInfo)
stripeRouter.post('/:user_id/subscribe', logRequest, isAuthenticated, subscribeToPlan)
stripeRouter.put('/:user_id/subscribe', logRequest, isAuthenticated, switchPlan)
stripeRouter.delete('/:user_id/subscribe', logRequest, isAuthenticated, cancel)

module.exports = stripeRouter
