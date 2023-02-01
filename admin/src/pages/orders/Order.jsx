import "./order.css"
import { Link } from "react-router-dom";
import React, { useEffect, useState} from 'react'


function Order() {


     const [allProduct, setAllProduct] = useState([]);
     const [markOrderCompleted, setMarkOrderCompleted] = useState(false);

     async function getAllProduct() {
          try {
               fetch(`http://localhost:4000/user/getallorders`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json',
                    },
               })
                    .then((resp) => { return resp.json() })
                    .then((res) => {
                         console.log("res ", res);
                         // const result = res;
                         // console.log(...res)
                         setAllProduct(res);
                         // console.log("alldata ", allProduct)
                    })
                    .catch((error) => {
                         console.log(error)
                         // navigate("/product")
                         console.log("Some err occured while accessing the id")

                    });
          }
          catch {

          }
     }

     function cancelTheOrder(id) {

          console.log(id)
          try {
               fetch(`http://localhost:4000/product/admin/cancelorder/${id}`, {
                    method: 'DELETE',
                    headers: {
                         'Content-Type': 'application/json',
                    },
               })
                    .then((resp) => { return resp.json() })
                    .then((res) => {
                         // alert(res);
                         console.log("1")
                         console.log("res ", res);
                         return 1
                         // navigate("/")

                    })
                    .catch((error) => {
                         alert("some error occured")
                         console.log("0")
                         return 0
                    });
          }
          catch {
               alert("some error occured")
               console.log("0")
               return 0
          }
          console.log("remove item")
     }

     function markAsCompleted(id) {

          try {
               fetch(`http://localhost:4000/product/admin/completed/${id}`, {
                    method: 'PUT',
                    headers: {
                         'Content-Type': 'application/json',
                    }
               })
                    .then((resp) => { return resp.json() })
                    .then((res) => {
                         // alert(res);
                         setMarkOrderCompleted(true)
                         alert(res);
                         return 1
                         // navigate("/")

                    })
                    .catch((error) => {
                         alert("some error occured")
                         console.log("0")
                         return 0
                    });
          }
          catch {
               alert("some error occured")
               console.log("0")
               return 0
          }
          console.log("order completed")
     }


     useEffect(() => {
          getAllProduct();
     }, []);


     return (
          <div className="productList">
               <div className="header">
                    <Link to="/"><span className="heading">Home </span></Link>
                    <h1 className="heading">All the Orders </h1>
                    <Link to="/product"><span className="heading">Products </span></Link>
               </div>
               {
                    allProduct?.map((el) => {
                         {/* console.log(el); */ }
                         return (
                              <>
                                   <div key={el._id.slice(2, 9)} className="order_details">
                                        <div className="product-detail">
                                             <p className="userId">User ID:{" " + el.userID}</p>
                                             <p className="userId">Order ID:{" " + el._id}</p>
                                        </div>
                                        <div className="productsList">
                                             {/* {console.log("its element ", el.cartItems)} */}
                                             {

                                                  el.cartItems.map(
                                                       (orderItem) => {
                                                            return (
                                                                 <div className="cart-item-card">
                                                                      <div className="product">
                                                                           <span>Product ID</span>
                                                                           <h3 className="item-price">{orderItem._id}</h3>
                                                                      </div>
                                                                      <div className="product">
                                                                           <span> Name  </span>
                                                                           <h3 className="item-price">{orderItem.productName}</h3>
                                                                      </div>

                                                                      <div className="product">
                                                                           <span> Price</span>
                                                                           <h3 className="item-price">{orderItem.price}</h3>
                                                                      </div>

                                                                      <div className="product">
                                                                           <span> Quantity</span>
                                                                           <h3 className="item-price">{orderItem.quantity}</h3>
                                                                      </div>
                                                                      <div className="product">
                                                                           <span> Total</span>
                                                                           <h3 className="item-price">{orderItem.total}</h3>
                                                                      </div>

                                                                      {/* <h3 className="total-item-price" ref={quantity}><span>$</span>{totalPrice}</h3> */}
                                                                      {/* <button className="delete-item" onClick={removeFromCart}>DELETE</button> */}
                                                                 </div>
                                                            )
                                                       }
                                                  )
                                             }
                                        </div>
                                        {!el.completed
?
                                        <div className="actionBTN">
                                             <button className="cancelOrder" onClick={
                                                  (ele) => { (cancelTheOrder(el._id) ? console.log("cant remove") : ele.target.parentElement.remove()) }
                                             }>Cancel The Order</button>
                                             <button className="markAsCompleted" onClick={
                                                  (ele) => { (markAsCompleted(el._id) ? console.log("cant remove") : ele.target.parentElement.remove()) }
                                             }>Mark as Completed</button>
                                             </div>
                                              
                                             : <h1 className="orderCHeading">Order is Completed</h1>
                                        }
                                        

                                   </div>

                              </>
                         )

                    })
               }
          </div>
     )
}

export default Order

// ele.target.parentElement.remove() : console.log(ele.target.parentElement)