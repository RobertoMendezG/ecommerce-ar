import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/home";
import DetailProduct from "./pages/DetailProduct";
import InciarS from "./pages/iniciarS";
import Regist from "./pages/Regist";
import Admin from "./pages/admin";
import ProductList from "./pages/ProductList";
import HomeOffers from "./pages/Offers";
import Conocenos from "./pages/Conocenos";
import ProductUpdate from "./pages/ProductUpdate";



function App() {
  return (
    <div>
      <BrowserRouter>


        <Routes>
      
          <Route path="/" element={<HomePage/>} />
          <Route path="/DetailProduct/:id" element={<DetailProduct/>} />
          <Route path="/Login" element={<InciarS/>} />
          <Route path="/Register" element={<Regist/>} />
          <Route path="/HomeOffers" element={<HomeOffers/>} />
          <Route path="/Conocenos" element={<Conocenos/>} />
          

          {"vista de administrador"}
          <Route path="/admin" element={<Admin/>} />
          <Route path="/ProductList" element={<ProductList/>} />
          
          <Route path="/ProductUpdate/:id" element={<ProductUpdate/>} />

        </Routes>

        </BrowserRouter> 
    </div>
  )
}

export default App;
