
import './App.css';
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import Order from './pages/orders/Order';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/manageOrders" element={<Order/>}/>
      </Routes>
    </div>
  )
}

export default App;
