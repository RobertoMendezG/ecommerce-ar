

import Navbar from "../components/Navbar";
import CartView from "../components/CartView";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

function ViewCart() {

  

  return (
    <>
      <div className="bg-gray-100">
        <div className="overflow-x-hidden bg-violet-500">
          <Navbar />
        </div>
        
        <div className="card mb-12">
          <CartView />
        </div>

        <div className="overflow-x-hidden bg-violet-500 text-white">
          <div className="top-3">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewCart
