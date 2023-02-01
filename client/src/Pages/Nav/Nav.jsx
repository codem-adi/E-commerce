import "./nav.css"
import { Link } from "react-router-dom";
import { useEffect, useContext } from 'react'
import { Cart } from "../../context/Context";


function Nav() {

     const { cart, getDataFromCart } = useContext(Cart)

     useEffect(() => {

          getDataFromCart("63d7f8fa2fca84677198c82d")
     }, [])


     return (
          <nav>
               <div className="header">

                    <h1><span className="user">USER</span>{process.env.REACT_APP_USER_ID}</h1>

                    <Link className="to-cart"
                         to={{
                              pathname: "/cart",
                              state: { fromDashboard: true }
                         }}
                    >
                         <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                         { console.log("nav ", cart)}
                         <span className="cart-count">{cart.length}</span>
                    </Link>
               </div>
          </nav>
     )
}

export default Nav