import React from 'react'
import { useState } from 'react'
import CURD from '../curdPage/curd'
import "./home.css"
import { Link,useNavigate } from "react-router-dom";


function Home() {
     const [editMode, setEditMode] = useState(false);
     const [getId, setGetId] = useState("");
     const [currentValue, setCurrentValue] = useState({})
     const [formErrors, setFormErrors] = useState({});

     const navigate = useNavigate();

     //editing the product
     function editTheMovie() {
          setFormErrors(validate(getId));
          if (Object.keys(validate(getId)).length <= 0) {
               
               try {
                    fetch(`http://localhost:4000/product/admin/single/${getId}`, {
                         method: 'GET',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    })
                         .then((resp) => { return resp.json() })
                         .then((res) => {

                              setCurrentValue(res);
                              console.log("current value from home ", res);
                              setEditMode(true);
                         })
                         .catch((error) => {
                              console.log(error)
                              navigate("/product")
                              console.log("Some err occured while accessing the id")

                         });
               }
               catch {

               }


          }
          // console.log(editMode);
     }


     //removing the product
     function deleteTheMovie() {
          if (Object.keys(validate(getId)).length <= 0) {

               try {
                    fetch(`http://localhost:4000/product/admin/remove/${getId}`, {
                         method: 'DELETE',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    })
                         .then((resp) => { return resp.json() })
                         .then((res) => {
                              alert(res);
                              navigate("/")
                              // console.log("res ", res);
                         })
                         .catch((error) => {
                              alert("some error occured")

                         });
               }
               catch {

               }


          }
     }

     function validate(id) {
          const err = {};

          if (!getId) {
               err.message = "please enter somthing"

          }
          else if (getId.length < 24) {
               err.message = "id must be atleast 24 carecter"
          }
          else if (getId.length > 24) {
               err.message = "id can't be more then 24 carecter"
          }

          return err
     }
     function handleChange(e) {
          e.preventDefault();
          setGetId((e.target.value).trim())
     }
     return (
          <div>
               <div className="header">
                    <Link to="/product"><span className="heading">Products </span></Link>
                    <h1 className="heading">Home</h1>
                    <Link to="/manageOrders"><span className="heading">Orders </span></Link>
               </div>
               <h1>Update or Remove Product</h1>
               <section className='createProduct'>
                    <input type="text" onChange={handleChange} className="productIdHolder" id="idHolder" placeholder='Enter id here' name="idHolder" value={getId} />
                    <h3 className='itsErrorTag'>{formErrors.message}</h3>
                    <div className='operationBtn'>
                         <button className='editProduct' onClick={editTheMovie}>Edit</button>
                         <button className='deleteProduct' onClick={deleteTheMovie}>Delete</button>
                    </div>
               </section>
               {!editMode ?
                    <div className='ordersList'>
                         <h1>Create new Product</h1>
                         <CURD />
                    </div>
                    :
                    <div className='ordersList'>
                         <h1>Edit The Product</h1>
                         <CURD isit="true" idToUpdate={getId} currentValue={currentValue} />
                    </div>
               }
          </div>
     )
}

export default Home
