

import Navbar from "../components/Navbar";
import CardOffers from "../components/CardOffers";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

function HomeOffers() {

  

  return (
    <>
      <div className="bg-gray-100">
        <div className="overflow-x-hidden bg-violet-500">
          <Navbar />
        </div>
        
        <div className="card mt-2">
          <CardOffers />
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

export default HomeOffers
