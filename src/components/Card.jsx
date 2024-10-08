
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/config";

const Card = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const productosRef = collection(db, "productos");
        getDocs(productosRef)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);


    return (
        <>
            <div className="h-screen  bg-gray-100 flex items-center justify-center gap-10">
                {productos.map((producto) => (

                    <div key={producto.id} className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-mb overflow-hidden rounded-3xl">
                        <div className="w-60 h-68 p-4 flex sm:w-48 sm:h-58 ml-10">
                            <img className="object-cover " src={producto.imagen} alt="" />
                        </div>

                        <div className="p-5 flex flex-col gap-3">

                            <h2 className="product-title">
                                {producto.nombre}
                            </h2>

                            <div>
                                <span className="text-xl font-bold">
                                    {producto.precio}
                                </span>

                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm line-through opacity-50">
                                        $1800.99
                                    </span>
                                    <span className="descuento-product">Descuento de {producto.descuento}%</span>
                                </div>
                            </div>


                            <div className="mt-5 flex gap-2">
                                <button className="button-primary">Agregar a carrito</button>
                                <Link to={`/DetailProduct/${producto.id}`} className="button-icon" >
                                    <button ><FaEye /></button>
                                </Link>
                            </div>



                        </div>
                    </div>
                ))};


            </div>
        </>
    );
}

export default Card;
