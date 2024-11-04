import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/config";

const CardOffers = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const productosRef = collection(db, "productos");

        getDocs(productosRef)
            .then((resp) => {
                const filteredProducts = resp.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                    .filter((producto) =>
                        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                setProductos(filteredProducts);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, [searchTerm]);

    return (
        <>

            {/* buscador */}
            <div class="relative bg-gray-100 rounded-lg shadow-md sm:w-64 md:w-80">
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Buscar Productos"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                </div>
            </div>
            {/* buscador */}

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">

                    {/* filtro para productos con descuento*/}
                    {productos.filter(producto => producto.descuento > 0).map((producto) => (
                        <div key={producto.id} className="bg-white text-gray-700 shadow-lg rounded-3xl overflow-hidden flex flex-col">
                            {/* Contenedor de la Imagen */}
                            <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 p-4 flex justify-center items-center">
                                <img className="object-contain w-full h-full max-w-full max-h-full rounded-t-3xl" src={producto.imagen} alt={producto.nombre} />
                            </div>

                            {/* Contenedor de la Información */}
                            <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-3">
                                {/* Nombre del Producto */}
                                <h2 className="text-base md:text-lg lg:text-xl font-semibold">
                                    {producto.nombre}
                                </h2>

                                {/* Precio del Producto */}
                                <span className="text-xl font-bold">
                                    ${producto.precio}
                                </span>
                                {producto.descuento > 0 && ( // se revisa si el descuento es 0
                                    <div>

                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm line-through opacity-50">
                                                ${(producto.precio * (1 + producto.descuento / 100)).toFixed(2)}
                                            </span>
                                            <span className="text-xs sm:text-sm text-red-500">
                                                Descuento de {producto.descuento}%
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Botones de Acción */}
                                <div className="mt-5 flex flex-col sm:flex-row gap-2">
                                    <button onClick={() => addToCart(producto)} className="button-primary w-full sm:w-auto">Agregar al carrito</button>
                                    <Link to={`/DetailProduct/${producto.id}`} className="button-icon w-full sm:w-auto flex justify-center items-center">
                                        <FaEye />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
};

export default CardOffers;