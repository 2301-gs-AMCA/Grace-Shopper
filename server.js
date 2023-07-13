require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authRequired } = require("./routes/utils");
const PORT = process.env.PORT || 3000;
const server = express();


const client = require("./db/client");
client.connect();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use(cookieParser(process.env.COOKIE_SECRET));

// Servers the built React app
server.use(express.static(path.join(__dirname, "./client", "dist")));

// Routes
server.use("/api", require("./routes"));

server.get("/test", authRequired, (req, res, next) => {
  res.send("You are authorized");
});
//Stripe/////////////////////////////////////////////////////////
// const stripe = require("stripe")('sk_test_51NSsoYE7507WjCKqRjIFVFzFZaiy0wOqpY9QfY9UxFG7IDLn9vBSzwiEFLrYsXT2sl8o4QSkMX3uLIiZfLfMljUU00JEpHouh0');



// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   console.log("inside of calculatedOrderAmount",items)
//   return 1400;
// };

// server.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;
// try {
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// } catch (error) {
//   console.log(error)
// } 
// });


//////////////////////////////////////////////////////////////////////////////
// Sends the built React app for all other requests
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});


server.use((err, req, res, next) => {
  res.send({
    success: false,
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});
server.listen(4242, () => console.log("Node server listening on port 4242!"));
server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
