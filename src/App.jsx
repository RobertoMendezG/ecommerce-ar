import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/home";
import DetailProduct from "./pages/DetailProduct";
import InciarS from "./pages/iniciarS";
import Regist from "./pages/Regist";



function App() {
  return (
    <div>
      <BrowserRouter>


        <Routes>
      
          <Route path="/" element={<HomePage/>} />
          <Route path="/DetailProduct/:id" element={<DetailProduct/>} />
          <Route path="/Login" element={<InciarS/>} />
          <Route path="/Register" element={<Regist/>} />
        </Routes>


        </BrowserRouter> 
    </div>
  )
}

export default App;
