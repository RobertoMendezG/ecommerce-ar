import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/config";
import { useParams } from "react-router-dom";
import { useCart } from './Cart';

const Product = () => {
    const [items, setItem] = useState(null);
    const [cantidad, setCantidad] = useState(0);
    const { id } = useParams();
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        const docRef = doc(db, "productos", id);
        getDoc(docRef)
            .then((resp) => {
                if (resp.exists()) {
                    setItem({
                        ...resp.data(),
                        id: resp.id,
                    });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }, [id]);

    const incrementarCantidad = () => setCantidad(cantidad + 1);
    const decrementarCantidad = () => {
        if (cantidad > 0) setCantidad(cantidad - 1);
    };

    return (
        <section className="container mx-auto px-4">
            {items ? (
                <>
                    <h2 className="mb-4 text-3xl font-bold">{items.nombre}</h2>
                    <p className="mb-5 text-gray-400">{items.descripcion}</p>
                    <div className="grid grid-cols-3 items-center gap-4 font-bold mb-5">
                        <span className="text-3xl">${items.precio}</span>
                        <span className="mr-auto ml-6 rounded-md bg-purple-200 py-1 px-2 text-purple-700">{items.descuento}%</span>
                        <span className="text-right text-lg text-gray-300 line-through">
                            ${(items.precio * (1 + items.descuento / 100)).toFixed(2)}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 font-bold">
                        <div className="col-span-3 flex items-baseline justify-between rounded-md bg-gray-200 pb-3 py-2 px-5">
                            <button
                                className="text-3xl text-violet-600"
                                onClick={decrementarCantidad}
                            >
                                -
                            </button>
                            <span className="text-xl">{cantidad}</span>
                            <button
                                className="text-3xl text-violet-600"
                                onClick={incrementarCantidad}
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="col-span-3 flex rounded-md bg-violet-600 hover:bg-violet-500 py-3 items-center gap-x-3 mt-5 justify-center text-white"
                            onClick={() => {
                                if (cantidad > 0) {
                                    for (let i = 0; i < cantidad; i++) {
                                        agregarAlCarrito({ ...items });
                                    }
                                    alert(`${cantidad} x ${items.nombre} agregado(s) al carrito`);
                                    setCantidad(0); 
                                } else {
                                    agregarAlCarrito({ ...items, cantidad });
                                    alert(`${items.nombre} agregado al carrito`);
                                }
                            }}
                        >
                            <FaCartPlus /> <span>Agregar a carrito</span>
                        </button>
                    </div>
                </>
            ) : (
                <p>Producto no encontrado.</p>
            )}
        </section>
    );
};

export default Product;



