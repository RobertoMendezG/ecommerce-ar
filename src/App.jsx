import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

function App() {
  return (
    <>
    <div className="overflow-x-hidden bg-blue-900">
      <Navbar  />
      </div>
      <Banner/>
      <Card/>
      <div className="overflow-x-hidden bg-blue-900 text-white">
      <Footer/>
    </div>
    </>
  )
}

export default App
