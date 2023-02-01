const router = require("express").Router();
const Product = require("../Model/productModel");
const Order = require("../Model/orders")
const { route } = require("./user");


//mark as completed
router.put("/completed/:id", async (req, res) => {

     try {
          if (Order.findById(req.params.id)) {
               const markAsCompleted = await Order.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
               markAsCompleted.save()
               console.log("order completed");
               res.status(200).json("Order is completed")
               return
          }
          else {
               res.json("no user found");
          }
     } catch (err) { res.status(500).json('error on the server try again later') }

})


router.get("/single/:id", async (req, resp) => {
     try {
          if (Product.findById(req.params.id)) {
               const iteam = await Product.findById(req.params.id)
               console.log(iteam);
               resp.status(200).json(iteam);
          } else {
               resp.status(201).json("sorry wrong id ");
          }
     } catch (err) {
          // console.log("this is err", err);
          console.log(err)
          resp.status(500).json("Some err occured while accessing the id on server")
     }
})

//insert product
router.post("/add", async (req, resp) => {

     try {
          console.log("printing ")
          console.log(req.body)
          const newItem = new Product({
               productName: req.body.productName.trim(),
               productDec: req.body.productDec.trim(),
               image: req.body.image.trim(),
               price: req.body.price,
          });
          // console.log(newItem)
          await newItem.save()
          resp.status(200).json("product Added");
     } catch (err) {
          // console.log("this is err", err);
          console.log(err)
          resp.status(500).json("Some err occured")
     }
})



//Update the product
router.put("/update/:id", async (req, res) => {

     try {
          if (Product.findById(req.params.id)) {
               const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
               updatedProduct.save()
               console.log(updatedProduct);
               res.status(200).json("updated successfully " + updatedProduct)
               return
          }
          else {
               res.json("no user found");
          }
     } catch (err) { res.status(500).json(err) }

})

//cancel the order
router.delete("/cancelorder/:id", async (req, res) => {
     try {
          if (await Order.findById(req.params.id)) {
               await Order.findByIdAndDelete(req.params.id);
               // await Product.findById(req.params.id);
               res.status(200).json("order canceled successfuly")
               return
          }
          res.status(201).json("no user find")
     } catch (err) { res.status(500).json("Can't find the id or some error occured") }
})




//Delete the product
router.delete("/remove/:id", async (req, res) => {

     try {
          await Product.findByIdAndDelete(req.params.id);
          res.status(201).json("Product removed successfuly")
     } catch (err) { res.status(500).json("Can't find the id or some error occured") }

})

//Get all products
router.get("/all", async (req, res) => {
     try {
          let product = await Product.find()
          res.status(200).json(product.reverse());
     } catch (err) { res.status(500).json("server si busy or not available") }
})


module.exports = router;