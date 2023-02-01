import "./success.css"
import { Link } from "react-router-dom";

function Success() {

  return (
       <div className="container">
          <h1 >Payment Success</h1>          
            <Link className="to-cart"
                 to={{pathname: "/"}}>
                 <h1 className="SuccessTag">go to home page</h1>
            </Link>
       </div>
  )
}

export default Success