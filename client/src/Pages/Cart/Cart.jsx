import "./Cart.css"

import React, { useContext, useEffect, useRef, useState } from 'react'
import Cartitem from "./Cartitem/Cartitem"
import { Cart } from "../../context/Context"
import { useNavigate } from "react-router-dom";


function Cartpage() {

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  const [total, setTotal] = useState(0)
  const { cart, getDataFromCart, calTotal} = useContext(Cart);

  const navigate = useNavigate();

  

  async function calculateTotal() {
    let myPayment = calTotal(cart);
    
    console.log('myPayment ', myPayment)
    
    if (cart.length > 0) {

      setSubTotal(myPayment.subTotal);
      setShipping(myPayment.shipping)
      setTotal(myPayment.Total);

      const box = document.getElementById("order-details");
      box.classList.toggle("cehckout-box");
      
    }
    else {
      alert("cart is empty for now")
    }
  }

  async function payment() {
    if (cart.length > 0) {
      navigate("/payment", { state: { totalpayment: total, id: "63d7f8fa2fca84677198c82d" } })
    }
  }
  useEffect(() => {

    // async function getDataFromCart() {

    //   try {
    //     fetch(`http://localhost:4000/cart/product/63d54ad008b62a3e37db6138`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //       .then((resp) => { return resp.json() })
    //       .then((res) => {
    //         // alert(res);
    //         setCart(res)

    //         // navigate("/")

    //       })
    //       .catch((error) => { });
    //   }
    //   catch {
    //     // alert("some error occured")
    //     console.log("some error occured")
    //     return 0
    //   }
    // }

    // getDataFromCart();

    // calculateTotal();

    getDataFromCart("63d7f8fa2fca84677198c82d")

    // let pay = calTotal(cart);

  }, [])


  return (
    <>
      <h1 className="heading">CART DETAILS</h1>
      <div className="Cart">
        <div className="current-items" id="its_cartList">
          {
            cart.map((el) => {
              return <Cartitem key={el._id} element={el} />
            })
          }
        </div>
        <div className="total-payment">
          <h2 className="order-summary">order summary</h2>
          <div className="order-details cehckout-box" id="order-details">
            <section className="order-amount-cal">
              <div className="amount-column">
                <h6 className="light">Sub Total</h6><h6 id="subTotal"><span>$</span>{subTotal}</h6>
              </div>
              <div className="amount-column">
                <h6 className="light" >Shipping</h6><h6 id="shipping-charges"><span>$</span>{shipping}</h6>
              </div>
            </section>
            <section className="total-order-amount">
              <div className="amount-column"><h6 className="light">Total</h6><h6 id="total"><span>$</span>{total}</h6></div>
            </section>
          </div>
          <button className="cehck-out" onClick={calculateTotal}>REFERESH CART</button>
          <button className="cehck-out" onClick={payment}>PAY NOW</button>
        </div>
      </div>
    </>
  )
}

export default Cartpage