import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../components/Product"


function DetailProduct() {
  return (
    <>
    <div className="bg-gray-100">
    <div className="overflow-x-hidden bg-violet-500">
      <Navbar  />
      </div>
      <div>
        <Product/>
      </div>
      <div className="overflow-x-hidden bg-violet-500 text-white">
        <div className="top-3">
      <Footer/>
      </div>
    </div>
    </div>
    </>
  )
}

export default DetailProduct;
