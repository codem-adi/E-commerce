const dotenv = require("dotenv").config();
const exp = require("express");
const ProductRoute = require("./Routes/product");
const CartRoute = require("./Routes/cart");
const UserRoute = require("./Routes/user")
const cors = require("cors");
const mongoose = require("mongoose");

//payment
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


const app = exp();
const Port = process.env.PORT || 4000

app.use(cors({
     origin: ["http://localhost:3000", "http://127.0.0.1:3000/",
          "http://localhost:3001", "http://127.0.0.1:3001/","http://localhost:4001"]
}))

mongoose.set('strictQuery', false);

app.use(exp.json());

mongoose.connect(process.env.Mongo_URL, { useNewUrlParser: true });

mongoose.connection.useDb('Netflix');

app.use("/product/admin", ProductRoute);
app.use("/cart", CartRoute);
app.use("/user", UserRoute)


//Payment
app.post('/create-me-a-url', async (req, resp) => {
     // resp.json({ url: "https://bobbyhadz.com/blog/javascript-typeerror-regex-test-is-not-a-function" })

     console.log(req.body)

     try {
          const session = await stripe.checkout.sessions.create({
               payment_method_types: ["card"],
               mode: "payment",
               line_items: req.body.map(item => {
                    const storeItem = item
                    return {
                         price_data: {
                              currency: "inr",
                              product_data: {
                                   name: storeItem.productName,
                              },
                              unit_amount: storeItem.price,
                         },
                         quantity: item.quantity,
                    }
               }),
               // success_url: `${process.env.CLIENT_URL}/success.html`,
               // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
               success_url: `http://localhost:3000/payment/success`,
               cancel_url: `http://localhost:3000/cart`,
          })
          resp.json({ url: session.url })
     }
     catch (e) {
          resp.status(500).json({ error: e.error })
          console.log("err", e)
     }
})


app.listen(Port, () => {
     console.log("server running on port " + Port)
})
