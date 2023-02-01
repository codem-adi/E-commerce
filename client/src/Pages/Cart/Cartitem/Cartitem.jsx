import "./cartitem.css"

import React, { useContext, useRef, useState } from 'react'
import { Cart } from "../../../context/Context";

function Cartitem({ element }) {

     let [productCount, setProductCount] = useState(element.quantity);
     const [totalPrice, setTotalPrice] = useState(element.price * productCount);

     const { cart, setCart, calTotal, pushNewCart } = useContext(Cart);
     // const { totalAmount, setTotalAmount } = useContext(TotalAmount);

     const quantity = useRef();



     function incremenet() {
          if (productCount < 10) {
               setProductCount(++productCount);
               
               cart.map((el) => {

                    if (el._id === element._id) {
                         el.quantity = productCount
                         el.total = el.price * el.quantity
                    }
                    
               })
               
               setTotalPrice(element.price * productCount)

               pushNewCart(cart, "63d7f8fa2fca84677198c82d");

               calTotal(cart);


          }

     }

     function dicrement() {
          if (productCount > 1) {
               setProductCount(--productCount);
               cart.map((el) => {
                    if (el._id === element._id) {
                         el.quantity = productCount
                         el.total = el.price * el.quantity
                    }
               })
               setTotalPrice(element.price * productCount)
               pushNewCart(cart, "63d7f8fa2fca84677198c82d");
               calTotal(cart);
          }
     }

     function removeFromCart(e) {
          e.preventDefault();


          let newArray = []
          newArray = cart.filter(el => {
               return el._id !== element._id
          })

          setCart(cart.filter(el => { return el._id !== element._id }))
          pushNewCart(newArray, "63d7f8fa2fca84677198c82d");
          calTotal(cart);

     }

     return (
          <div className="cart-item-card">
               <img alt="its product pic" src={element.image}></img>
               <div className="product-detail">
                    <h1>{element.productName}</h1>
                    <p>{element.productDec}</p>
               </div>
               <h3 className="item-price"><span>$</span> {element.price}</h3>
               <div className="order-count">
                    <button onClick={dicrement}>-</button>
                    <span>{element.quantity}</span>
                    <button onClick={incremenet}>+</button>
               </div>
               <h3 className="total-item-price" ref={quantity}><span>$</span>{totalPrice}</h3>
               <button className="delete-item" onClick={removeFromCart}>DELETE</button>
          </div>
     )
}

export default Cartitem