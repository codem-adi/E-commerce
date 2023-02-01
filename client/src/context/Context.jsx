import { createContext, useState } from "react"

export const Cart = createContext();
// export const TotalAmount = createContext();

function Context({ children }) {

    

     
     const [cart, setCart] = useState([]);
   

     console.log("set cart run from context ", cart)

     const getDataFromCart = (userID) => {

          // console.log("its a " + a);
          try {
               fetch(`http://localhost:4000/cart/product/${userID}`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json',
                    },
               })
                    .then((resp) => { return resp.json() })
                    .then((res) => {
                         setCart(res)
                    })
                    .catch((error) => { });
          }
          catch {
               alert("some error occured")

               return 0
          }

     }

     let calTotal = (Currentcart) =>{
          let payment = { subTotal: 0, shipping: 0, Total: 0 }
          if (Currentcart.length > 0) {
               payment.subTotal = Currentcart.reduce((sum, el) => sum + el.total, 0)
               payment.shipping = Math.floor((payment.subTotal * 2) / 100)
               payment.Total = payment.subTotal + payment.shipping
          }
          else {
               alert("cart is empty for now")
          }
          return payment;
     } 
    
     const pushNewCart = (newCart, userID) => {

          console.log("its from context ", newCart);
          try {

               fetch(`http://localhost:4000/cart/submit/${userID}`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCart)
               })
                    .then((resp) => { return resp.json() })
                    .then((res) => {
                         
                    })
                    .catch((error) => { });
          }
          catch {
               alert("some error occured")
               console.log("0")
          }
     }
     // setCart(cart);
     return (
          <Cart.Provider value={{ cart, setCart, getDataFromCart, pushNewCart, calTotal }}>
               {children}

          </Cart.Provider>
     )
}

export default Context