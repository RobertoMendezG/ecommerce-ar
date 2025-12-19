import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { CartProvider } from './components/Cart';
import { ToastContainer} from 'react-toastify';


import HomePage from "./pages/home";
import DetailProduct from "./pages/DetailProduct";
import InciarS from "./pages/iniciarS";
import Regist from "./pages/Regist";
import ProductList from "./pages/ProductList";
import ViewDashboard from "./pages/ViewDashboard";
import HomeOffers from "./pages/Offers";
import Conocenos from "./pages/Conocenos";
import ViewCart from "./pages/ViewCart";
import ProductUpdate from "./pages/ProductUpdate";
import Admin from "./pages/admin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/DetailProduct/:id" element={<DetailProduct />} />
            <Route path="/Login" element={<InciarS />} />
            <Route path="/Register" element={<Regist />} />
            <Route path="/HomeOffers" element={<HomeOffers />} />
            <Route path="/Conocenos" element={<Conocenos />} />
            <Route path="/ViewCart" element={<ViewCart />} />
            {"vista de administrador"}
            <Route path="/admin" element={<Admin />} />
            <Route path="/ProductList" element={<ProductList />} />
            <Route path="/ViewDashboard" element={<ViewDashboard />} />
            <Route path="/ProductUpdate/:id" element={<ProductUpdate />} />
          </Routes>
          
        </CartProvider>
      </BrowserRouter>
       <ToastContainer/>
    </div>
  )
}

export default App;
