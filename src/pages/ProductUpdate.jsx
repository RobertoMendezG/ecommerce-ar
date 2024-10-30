
import UpdateProduct from "../components/UpdateProduct";

import { useParams } from 'react-router-dom';


function ProductUpdate() {

  const { id } = useParams();
  
  return (
    <div className="bg-gray-100">
    
        <UpdateProduct productId={id} />
      
    </div>
  )
}

export default ProductUpdate;
