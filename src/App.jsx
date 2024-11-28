import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


import { CartProvider } from './components/Cart';

import HomePage from "./pages/home";
import DetailProduct from "./pages/DetailProduct";
import InciarS from "./pages/iniciarS";
import Regist from "./pages/Regist";
import Admin from "./pages/admin";
import ProductList from "./pages/ProductList";
import HomeOffers from "./pages/Offers";
import Conocenos from "./pages/Conocenos";
import ViewCart from "./pages/ViewCart";
import ProductUpdate from "./pages/ProductUpdate";
import FormPag from './FormPag';




function App() {
  return (
    <div>
      <BrowserRouter>
      <CartProvider>


        <Routes>
      
          <Route path="/" element={<HomePage/>} />
          <Route path="/DetailProduct/:id" element={<DetailProduct/>} />
          <Route path="/Login" element={<InciarS/>} />
          <Route path="/Register" element={<Regist/>} />
          <Route path="/HomeOffers" element={<HomeOffers/>} />
          <Route path="/Conocenos" element={<Conocenos/>} />
          <Route path="/ViewCart" element={<ViewCart/>} />
           {/* Este es un comentario de una línea */}
          <Route path="/formpag" element={<FormPag />} />

          {"vista de administrador"}
          <Route path="/admin" element={<Admin/>} />
          <Route path="/ProductList" element={<ProductList/>} />
          
          <Route path="/ProductUpdate/:id" element={<ProductUpdate/>} />

        </Routes>
        </CartProvider>

        </BrowserRouter> 
    </div>
  )
}

export default App;
