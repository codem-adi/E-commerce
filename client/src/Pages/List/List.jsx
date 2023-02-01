import "./List.css"
import React, { useEffect, useState } from 'react'
import Listitem from "./Listitem/Listitem"
import axios from "axios"



function List() {
  console.log("from nav ", process.env.REACT_APP_PORT)

  const [Product, setProduct] = useState();

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
    //     alert("some error occured")
       
    //     return 0
    //   }
    // }

    // getDataFromCart();

    async function getProducts() {
      let data = await axios.get("http://localhost:4000/product/admin/all");
     
      setProduct(data.data)
     
    }
    getProducts();

  }, []); 

  return (
    <div className="items-list">

      {Product?.map((el) => <Listitem key={el._id} product={el} />)}

    </div>
  )
}

export default List