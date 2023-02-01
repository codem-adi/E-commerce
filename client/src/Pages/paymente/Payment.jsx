import { useEffect, useState } from 'react';
import './form.css'
import { useLocation, useNavigate } from "react-router-dom";

// useLocation

function Payment() {

     const location = useLocation();
     const navigate = useNavigate();
     console.log("state got ", location.state);
     if (location.state.totalpayment === 0) {
          setTimeout(() => {
               alert("refresh the cart first")
               console.log("cant fo it ")
               navigate("/cart");
          }, 1000)

     }
     const initiaState = { username: "", email: "", phone: "", address: "", pincode: "" }
     const [formValues, setFormValues] = useState(initiaState);
     const [formErrors, setFormErrors] = useState({});
     const [isSubmit, setIsSubmit] = useState(false);

     //sending the data to the server
     function postDetails(data) {
          try {
               fetch('http://localhost:4000/cart/create/user', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
               })
                    .then((resp) => { return resp.json() })
                    .then((res) => {

                         // setTimeout(() => {
                         navigate("/gatway", { state: { _id: location.state.id } });
                         // },5000)
                         //here we are
                    })
                    .catch((error) => {
                         navigate("/")
                    });
          }
          catch {

          }
     }

     useEffect(() => {
          if (Object.keys(formErrors).length === 0 && isSubmit) {

               postDetails(formValues);
               navigate("/payment/gatway");

          }
     }, [formErrors]) // eslint-disable-line react-hooks/exhaustive-deps

     function handleChange(e) {
          const { name, value } = e.target
          setFormValues({ ...formValues, [name]: value })

     }

     function handleSubmit(e) {
          e.preventDefault();
          setFormErrors(validate(formValues));
          setIsSubmit(true)

     }

     const validate = (values) => {

          const errors = {};

          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

          if (!values.username) {
               errors.username = "Name is required";
          } else if (values.username.length < 3) {
               errors.username = "Name should be more then 3 letters"
          }
          if (!values.email) {
               errors.email = "Email is required";
          } else if (!regex.test(values.email)) {
               errors.email = "Not a valid email"
          }
          if (!values.phone) {
               errors.phone = "Phone Number is required";
          } else if (values.phone.length < 10) {
               errors.phone = "Phone number must be 10 digit"
          }
          else if (values.phone.length > 10) {
               errors.phone = "Phone number can't be more then 10 digit"
          }
          if (!values.address) {
               errors.address = "address is required";
          }
          if (!values.pincode) {
               errors.pincode = "pincode is required"
          }
          else if (values.pincode.length > 6 || values.pincode.length < 6) {
               errors.pincode = "enter a valid pin code"
          }
          return errors;

     }
     return (
          <>
               <h1 className='heading'>Fill The Form Procide with Payment</h1>
               <div className="details">
                    {/* {Object.keys(formErrors).length === 0 && isSubmit ? <Congratulations/>:""} */}
                    <form className='details_form' onSubmit={handleSubmit}>
                         <div className="mb-3">
                              <label className="form-label">Full Name</label>
                              <input type="text" onChange={handleChange} className="form-control" id="InputName" name="username" value={formValues.username} />

                         </div>
                         <h3>{formErrors.username}</h3>
                         <div className="mb-3">
                              <label className="form-label">Email address</label>
                              <input type="email" onChange={handleChange} className="form-control" name="email" id="InputEmail" value={formValues.email} />
                         </div>
                         <h3>{formErrors.email}</h3>
                         <div className="mb-3">
                              <label className="form-label">Phone Number</label>
                              <input type="number" onChange={handleChange} className="form-control" name="phone" id="InputNumber" value={formValues.phone}></input>
                         </div>
                         <h3>{formErrors.phone}</h3>
                         <div className="mb-3">
                              <label className="form-label">Address</label>
                              <input type="text" onChange={handleChange} className="form-control" name="address" id="InputNumber" value={formValues.address}></input>
                         </div>
                         <h3>{formErrors.address}</h3>
                         <div className="mb-3">
                              <label className="form-label">Pin Code</label>
                              <input type="number" onChange={handleChange} className="form-control" name="pincode" id="InputNumber" value={formValues.pincode}></input>
                         </div>
                         <h3>{formErrors.pincode}</h3>
                         <button type="submit" className="btn form_btn">submit</button>

                    </form>
               </div>
          </>
     );
}

export default Payment