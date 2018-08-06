// check env and load keys accordingly

module.exports = {
    stripePublishableKey: process.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
};