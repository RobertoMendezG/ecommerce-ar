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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
                {productos.map((producto) => (
                    <div key={producto.id} className="bg-white text-gray-700 shadow-lg rounded-3xl overflow-hidden flex flex-col">
                        <div className="w-full h-48 sm:h-56 md:h-64 p-4 flex justify-center items-center">
                            <img className="object-cover w-full h-full" src={producto.imagen} alt={producto.nombre} />
                        </div>

                        <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-3">
                            <h2 className="text-base md:text-lg lg:text-xl font-semibold">
                                {producto.nombre}
                            </h2>

                            <div>
                                <span className="text-xl font-bold">
                                    ${producto.precio}
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm line-through opacity-50">
                                        ${(producto.precio * (1 + producto.descuento / 100)).toFixed(2)}
                                    </span>
                                    <span className="text-xs sm:text-sm descuento-product">Descuento de {producto.descuento}%</span>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-col sm:flex-row gap-2">
                                <button className="button-primary w-full sm:w-auto">Agregar a carrito</button>
                                <Link to={`/DetailProduct/${producto.id}`} className="button-icon w-full sm:w-auto">
                                    <FaEye />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
