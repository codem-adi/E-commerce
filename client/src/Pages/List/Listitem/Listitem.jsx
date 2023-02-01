import "./listitem.css"

import React, { useContext } from 'react'
import { Cart } from "../../../context/Context";


function Listitem(product) {

     const { cart, setCart } = useContext(Cart)



     //sending cart to the server
     async function pushOnWeb(newCart) {

          // console.log("push on web run from listitem myod ", myod);
          // console.log("push on web run from listitem newcart ", newCart);
          //update the userCart
          await fetch(`http://localhost:4000/cart/submit/${"63d7f8fa2fca84677198c82d"}`, {
               method: "POST",
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(cart)
          }).then((res) => { return res.json() })
               .then((resp) => {
                    console.log("its resp from web ", resp)
               })
               .catch((err) => { });
     }

     function addtocart(e) {
          e.preventDefault();

          let isAlreadyIn = false;

          cart.map(element => {
               if (element._id === product.product._id) { isAlreadyIn = true }
          })

          if (isAlreadyIn) {
               alert("product already in cart")
          }
          else {
               const myNewOBJ = {
                    _id: product.product._id,
                    productName: product.product.productName,
                    productDec: product.product.productDec,
                    image: product.product.image,
                    isAvailable: product.product.isAvailable,
                    price: product.product.price,
                    quantity: 1,
                    total: product.product.price
               }
               // console.log("newobj  ", myNewOBJ);
               setCart([...cart, cart[cart.length] = myNewOBJ]);
               // setCart([...cart,)

               // console.log("pushing this new cart ", cart)

               pushOnWeb(cart);
          }

     }

     return (
          <div className="product-card">
               <div className="card">
                    <img className="product-image" src={product.product.image}
                         alt="its the product visiblitity"></img>
                    <div className="about-product">
                         <h2 className="product-heading">{product.product.productName}</h2>
                         <h5 className="product-description">{product.product.productDec}</h5>
                         <h3 className="price">Price:{" " + product.product.price} <sup>$</sup></h3>
                         <button onClick={addtocart} className="add-to-cart">Add to Cart</button>

                    </div>
               </div>
          </div>
     )
}

export default Listitem