
import Navbar from "../components/Navbar";
import CartView from "../components/CartView";

function ViewCart() {

  return (
    <>
      <div className="bg-gray-100">
        <div className="overflow-x-hidden bg-violet-500">
          <Navbar />
        </div>
        
        <div className="card flex-grow">
          <CartView />
        </div>

       
      </div>
    </>
  )
}

export default ViewCart




