
import HOME from "./Pages/HOME/Home"
import Cart from "./Pages/Cart/Cart";
import {BrowserRouter,Routes, Route } from "react-router-dom";
import Payment from "./Pages/paymente/Payment"
import Gatway from "./Pages/paymente/gatway/Gatway";
import Success from "./Pages/ResponcePage/Success";

function App() {
  console.log("from app ", process.env.REACT_APP_PORT)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HOME />} />
        
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/gatway" element={<Gatway />} />
          <Route exact path="/payment/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
