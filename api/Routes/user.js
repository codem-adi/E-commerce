const router = require("express").Router();
const User = require("../Model/User")
const Order = require("../Model/orders")

//place order
router.post("/placeorder/:id", async (req, resp) => {
     try {
          const ID = req.params.id
          if (ID) {
               let placeorder = new Order({
                    userID: req.params.id,
                    cartItems: req.body,
               });
               await placeorder.save();
               resp.status(200).json(placeorder);
               return
          }
          resp.status(200).json("sorry but no user found");
     } catch (err) {
          console.log(err)
          resp.status(500).json("cant't place the order for now")
     }
})


//get all orders 
router.get("/getallorders", async (req, resp) => {
     try {
          let orders = await Order.find()
          resp.status(200).json(orders.reverse());
     } catch (err) {
          // console.log(err)
          resp.status(500).json("some problem on the server")
     }
})


module.exports = router;