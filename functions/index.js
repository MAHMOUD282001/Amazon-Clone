const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// App Config
const app = express();

// Middlewares

app.use(cors({origin:true}));

app.use(express.json());

// API Routes

app.get("/", (req, res)=> res.status(200).send("Hello World"));

// Listen Command

exports.api = functions.https.onRequest(app);


app.post("/payments/create", async (req, res) => {
    const total = req.query.total
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    })
    
    res.status(201).send({
        clientSecret : paymentIntent.client_secret,
    })
})

// Example Endpoint
// http://127.0.0.1:5001/e-clone-1760d/us-central1/api