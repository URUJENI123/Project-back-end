import stripe from 'stripe';

const stripe = require process.env.STRIPE_SECRECT_KEY;

const createPaymentIntent = async (amount, currency) => {
    try {
        const paymentIntent = await stripe.PaymentIntentsResource.create({
            amount,
            currency,
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent', error);
        throw error;
    }
};

export default { createPaymentIntent };