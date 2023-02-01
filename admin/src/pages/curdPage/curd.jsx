import { useEffect, useState } from 'react';
import './form.css'
import { useNavigate } from "react-router-dom";
// useLocation

function Payment({ isit, idToUpdate, currentValue }) {


     const initiaState = { productName: "", image: "", productDec: "", price: "" }
     const [formValues, setFormValues] = useState(initiaState);
     const [formErrors, setFormErrors] = useState({});
     const navigate = useNavigate();

     //sending the data to the server
     function showingTheOldData() {
          formValues.productName = currentValue.productName
          formValues.productDec = currentValue.productDec
          formValues.price = currentValue.price
          formValues.image = currentValue.image

          document.getElementById("productName").value = currentValue.productName
          document.getElementById("productDec").value = currentValue.productDec
          document.getElementById("price").value = currentValue.price
          document.getElementById("image").value = currentValue.image

     }

     function newLoad() {
          formValues.productName = ""
          formValues.productDec = ""
          formValues.price = ""
          formValues.image = ""

          document.getElementById("productName").value = ""
          document.getElementById("productDec").value = ""
          document.getElementById("price").value = ""
          document.getElementById("image").value = ""
     }

     useEffect(() => {

          if (isit) {
               showingTheOldData();
          } else {
               newLoad();
          }

     }, [formErrors, isit])


     // eslint-disable-line react-hooks/exhaustive-deps

     function handleChange(e) {
          const { name, value } = e.target
          setFormValues({ ...formValues, [name]: value })
     }

     //creating a new product
     function createProduct(e) {
          e.preventDefault();
          setFormErrors(validate(formValues));


          if (Object.keys(validate(formValues)).length <= 0) {
               // console.log("verify ", validate(formValues), " ",Object.keys(validate(formValues)).length)
               // setIsSubmit(true)
               try {
                    fetch('http://localhost:4000/product/admin/add', {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify(formValues)
                    })
                         .then((resp) => { return resp.json() })
                         .then(() => {
                              alert("added successfully")
                              // navigate("/");
                         })
                         .catch((error) => {
                              alert("some error occured")
                              // navigate("/")
                         });
               }
               catch {

               }
          }

     }

     //modifying the existing one
     function updateProduct(e) {
          // e.preventDefault();
          console.log("currentvalue ", currentValue)
          console.log("form value ", formValues)
          if (Object.keys(validate(formValues)).length <= 0) {

               try {
                    fetch(`http://localhost:4000/product/admin/update/${idToUpdate}`, {
                         method: 'PUT',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify(formValues)
                    })
                         .then((resp) => { return resp.json() })
                         .then(() => {
                              alert("Updated Successfully")
                              // navigate("/");
                              // newLoad();
                         })
                         .catch((error) => {
                              console.log("some error occured")
                              // navigate("/")
                         });
               }
               catch {

               }
          }
          console.log(idToUpdate)
     }

     const validate = (values) => {

          const errors = {};

          if (!values.productName) {
               errors.productName = "Name is required";
          }
          if (!values.image) {
               errors.image = "image is required";
          }
          if (!values.productDec) {
               errors.productDec = "productDec Number is required";
          }
          if (!values.price) {
               errors.price = "price is required";
          }

          return errors;

     }
     return (
          <div className="details">

               {/* {Object.keys(formErrors).length === 0 && isSubmit ? <Congratulations/>:""} */}
               <form className='details_form'>
                    <div className="mb-3">
                         <label className="form-label">Product Name</label>
                         <input type="text" onChange={handleChange} className="form-control" id="productName" name="productName" value={formValues.productName} />
                    </div>
                    <h3>{formErrors.productName}</h3>
                    <div className="mb-3">
                         <label className="form-label"> Product Decription</label>
                         <input type="text" onChange={handleChange} className="form-control" name="productDec" id="productDec" value={formValues.productDec}></input>
                    </div>
                    <h3>{formErrors.productDec}</h3>
                    <div className="mb-3">
                         <label className="form-label">Image URL</label>
                         <input type="text" onChange={handleChange} className="form-control" name="image" id="image" value={formValues.image} />
                    </div>
                    <h3>{formErrors.image}</h3>

                    <div className="mb-3">
                         <label className="form-label">price</label>
                         <input type="number" onChange={handleChange} className="form-control" name="price" id="price" value={formValues.price}></input>
                    </div>
                    <h3>{formErrors.price}</h3>
                    {!isit ?
                         <button type="submit" onClick={createProduct} className="btn form_btn">Create Product</button>
                         : <button type="submit" onClick={updateProduct} className="btn form_btn">Edit Product</button>}
               </form>
          </div>
     );
}

export default Payment