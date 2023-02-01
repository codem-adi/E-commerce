import { useContext } from 'react'
import "./gatway.css"
import { Cart } from '../../../context/Context';
import { useLocation, useNavigate } from "react-router-dom";


function Gatway() {

     const location = useLocation();

     const { cart, pushNewCart } = useContext(Cart);

     const navigate = useNavigate();
     let ID = location.state._id


     function placeOrder(myFinalCart) {
          try {
               fetch(`http://localhost:4000/user/placeorder/:${ID}`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(myFinalCart)
               }).then(res => res.json)
                    .then().catch()
          } catch {
               navigate("/cart");
          }

     }

     function getThePaymentLink() {
          console.log(cart)
          if (cart.length > 0) {
               fetch("http://localhost:4000/create-me-a-url", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cart),
               })
                    .then(res => {


                         if (res.ok) return res.json()
                         console.log(res)
                         return res.json().then(json => Promise.reject(json))

                    }).then(({ url }) => {
                         placeOrder(cart)
                         pushNewCart([], ID)
                         // console.log("its url ", url)
                         window.location = url
                    }).catch(e => {
                         console.log("its an error")
                         console.error(e.error)
                    })
          }
     }

     return (<div className='box'>
          <h1>Use 4242 4242 4242 4242 as Card Number</h1>
          <h1>Cart will be empty after order is placed</h1>

          <button className='generateURL' onClick={getThePaymentLink}>click here to make the payment</button>
     </div>
     )
}

export default Gatway