import "./product.css"

import React, { useEffect, useState } from 'react'
import { Link} from "react-router-dom"


function Product() {


     const [allProduct, setAllProduct] = useState([]);


     async function getAllProduct() {
          try {
               fetch(`http://localhost:4000/product/admin/all`, {
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
                         console.log("alldata ", allProduct)
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

     useEffect(() => {
          getAllProduct();
     }, []);


     return (
          <div className="productList">
               <div className="header">
                    <Link to="/"><span className="heading">Home </span></Link>
                    <h1 className="heading">All the Products</h1>
                    <Link to="/manageOrders"><span className="heading">Orders </span></Link>
               </div>
               {
               
               allProduct?.map((el) => {
                    return (
                         <div key={el._id.slice(2,9) } className="cart-item-card">
                              <img alt="its product pic" src={el.image}></img>
                              <div className="product-detail">
                                   <h1>{el.productName}</h1>
                                   <p>{el.productDec}</p>
                                   <p>ID:{" "+el._id}</p>
                              </div>
                              <h3 className="item-price"><span>$</span> {el.price}</h3>
                         </div>
                    )
               })
          }

          </div>
     )
}

export default Product