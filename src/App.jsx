import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/home";
import DetailProduct from "./pages/DetailProduct";


function App() {
  return (
    <div>
      <BrowserRouter>


        <Routes>
      
          <Route path="/" element={<HomePage/>} />
          <Route path="/DetailProduct/5oh6FPnNDnpzFzHspcKc" element={<DetailProduct/>} />
        </Routes>


        </BrowserRouter> 
    </div>
  )
}

export default App
