

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

function HomePage() {

  

  return (
    <>
      <div className="bg-gray-100">
        <div className="overflow-x-hidden bg-violet-500">
          <Navbar />
        </div>
        
        <Banner />
        <div className="card">
          <Card />
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

export default HomePage
