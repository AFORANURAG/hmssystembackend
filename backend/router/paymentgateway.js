require("dotenv").config()
const stripe = require('stripe')(process.env.SECRET_KEY);
const express=require("express")
const paymentRouter = express.Router()

paymentRouter.post("/",async (req,res)=>{
    console.log(req.body)
    const {fees,doctorId,patientId,Datetime}=req.body.data
    const currency = 'INR';
    const doctorFee = fees * 100;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
              price_data: {
                currency: 'inr',
                product_data: {
                  name: 'Doctor Fees',
                  description: 'Fees for doctor appointment booking',
                },
                unit_amount: doctorFee,
              },
              quantity: 1,
            }],
            metadata: {
              doctorId: doctorId,
              patientId: patientId,
              bookingDate: Datetime
            },
            mode: 'payment',

            success_url: 'https://hmsfrontend-eight.vercel.app/',
            cancel_url: 'https://hmsfrontend-eight.vercel.app/',
            billing_address_collection:"required"
          });
         res.send({link:session.url})
    } catch (error) {
        res.json({message:"payment gateway crashed",error:error.message})
    }
})
module.exports ={paymentRouter}