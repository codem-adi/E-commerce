import "./Home.css"
import List from "../List/List"
import Nav from "../Nav/Nav"
import Footer from "../Footer/Footer"
// import * as dotenv from "dotenv";


function Home() {
     // dotenv.config();
     console.log("from home ", process.env.REACT_APP_PORT)
     return (
          <div className="home">
               <Nav />
               <List  />
               <Footer/>
          </div>
     )
}

export default Home