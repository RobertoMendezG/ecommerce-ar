import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import ImgDetail from "../components/ImgDetail";

import { useParams } from 'react-router-dom';




function DetailProduct() {

  const { id } = useParams();
  
  return (
    <div className="bg-gray-100">
    <div className="overflow-x-hidden bg-violet-500">
      <Navbar  />
      </div>
      <div className="mb-10 p-10 grid grid-cols-1 md:grid-cols-2">
        <div className="mb-5">
        <ImgDetail productId={id} />
        </div>

        <Product productId={id} />
      </div>
      <div className="overflow-x-hidden bg-violet-500 text-white">
        <div className="top-3">
      <Footer/>
      </div>
    </div>
    </div>
  )
}

export default DetailProduct;
