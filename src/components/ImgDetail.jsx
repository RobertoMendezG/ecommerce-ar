
import React from "react";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/config";
import { useParams } from "react-router-dom";

const ImgDetail = ({ productId }) => {

    const [items, setItem] = useState(null);
    const  id = useParams().id;
    useEffect(() => {

        const docRef = doc(db, "productos",id);

        getDoc(docRef)
            .then((resp) => {
                setItem(
                    {
                        ...resp.data(),
                        id: resp.id,
                        
                    }
                    
                );
            })
    }, [productId]);
    

    return (
<section className="grid md:grid-cols-1 md:gap-8">
        {items ? (
            <>
            <div className="col-span-4">
            <img src={items.imagen} alt="" className="ml-8" width={"300px"} height={"100px"} />
            
        </div>
        </>
        ) : (
            <p>Product not found.</p>
          )}


        
            
        </section>

        


    );
}

export default ImgDetail;