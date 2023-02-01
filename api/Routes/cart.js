const router = require("express").Router();
const { remove } = require("../Model/productModel");
const User = require("../Model/User")


//create user
router.post("/create/user", async (req, resp) => {
     try {
          // console.log(req.body)
          const newUser = new User({
               userName: req.body.username,
               email: req.body.email,
               phone: req.body.phone,
               address: req.body.address,
               pincode: req.body.pincode,
          });
          await newUser.save()
          resp.status(200).json(newUser._id);
     } catch (err) { resp.status(500).json("server is busy or not available") }
})


//add the cart to the order list
router.post("/submit/:id", async (req, resp) => {
     try {
          if (req.params.id) {
               await User.findByIdAndUpdate(req.params.id, { cartItems: req.body })
               resp.status(200).json("updated successfully");
               return
          }
          resp.status(200).json("sorry but no user found");
     } catch (err) { resp.status(500).json("server is busy or not available") }
})


//getCart
router.get("/product/:id", async (req, resp) => {
     try {
          if (req.params.id) {
               let person = await User.findById(req.params.id)
               resp.status(200).json(person.cartItems);
               console.log(req.params.id, " ", person.cartItems)
               return
          }
          resp.status(200).json("sorry but no user found");
     } catch (err) { resp.status(500).json("server is busy or not available") }

})

//insrt product in cart
router.put("/add/:id", async (req, resp) => {
     console.log("put")
     try {
          if (req.params.id) {
               let person = await User.findById(req.params.id);
               person.cartItems[req.body.itemid] = req.body.quantity
               person.cartItems[req.body.itemid + "1"] = req.body.quantity
               // person.cartItems[req.body.itemid] = ({ itemid: req.body.itemid, quantity: req.body.price })
               person.save();
               console.log(person);
               resp.status(200).json(person.cartItems);
               return
          }
          resp.status(200).json("sorry but no user found ", err);
     } catch (err) {
          console.log(err)
          resp.status(500).json("server is busy or not available ")
     }

})

// remove product from cart
router.put("/remove/:id", async (req, resp) => {
     console.log("put")
     try {
          if (req.params.id) {

               const person = await User.findById(req.params.id);

               if (person.cartItems.length <= 0) {
                    console.log(person.cartItems.length)
                    resp.json("ntg to remove");
                    return
               }

               else if (person.cartItems.itemid == req.body.itemid) {
                    console.log(req.body.itemid, " ", person.cartItems.itemid)
                    person.cartItems.pop(person.cartItems.itemid == req.body.itemid)
                    person.save();
                    resp.json("removed");
                    return
               }
               else {
                    console.log(req.body.itemid, " ", person.cartItems)
                    console.log("ietm not found")
                    resp.json("no data found");
                    return
               }
          }
          resp.status(200).json("sorry but no user found");
     } catch (err) { resp.status(500).json("server is busy or not available") }

})


module.exports = router;