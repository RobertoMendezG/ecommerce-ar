import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/home"
import DetailProduct from "./pages/DetailProduct"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/*" element={<DetailProduct/>} />
        </Routes>
        </Router>      
    </div>
  )
}

export default App
