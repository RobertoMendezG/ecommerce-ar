import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase/config";
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";

const Add = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescr, setProductDescr] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productDescu, setProductDescu] = useState("");
    const [showAlertSusses, setShowAlertSusses] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const navigate = useNavigate();


    const handleAddProduct = async () => {
        try {

            const productRef = collection(db, "productos");
            const q = query(productRef, where("nombre", "==", productName)); // Query producto nombre

            const querySnapshot = await getDocs(q);


            if (querySnapshot.empty) {
                const docRef = await addDoc(collection(db, "productos"), {
                    nombre: productName,
                    precio: productPrice,
                    imagen: productImage,
                    descripcion: productDescr,
                    descuento: productDescu,
                });
                console.log("Producto agregado con ID: ", docRef.id);
                setShowAlertSusses(true); // alert
            } else {

                // Si existe, mostrar alerta de producto duplicado
                console.log("Producto ya existe!");
                setShowAlertError(true);
            }
        } catch (e) {
            console.error("Error al agregar producto: ", e);
        }
    };

    const handleBackToDashboard = () => {
        navigate('/viewDashboard');
    };

    return (
        <>
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
                <h2 className="text-2xl font-semibold text-center mb-4">Agregar Producto</h2>
                <form className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            placeholder="Nombre del producto"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="precio">Precio</label>
                        <input
                            type="number"
                            id="precio"
                            placeholder="Precio del producto"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="imagen">Imagen URL</label>
                        <input
                            type="text"
                            id="imagen"
                            placeholder="URL imagen de producto"
                            value={productImage}
                            onChange={(e) => setProductImage(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="descripcion">Descripción</label>
                        <input
                            type="text"
                            id="descripcion"
                            placeholder="Descripción del producto"
                            value={productDescr}
                            onChange={(e) => setProductDescr(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="descuento">Descuento</label>
                        <input
                            type="number"
                            id="descuento"
                            placeholder="Descuento del producto"
                            value={productDescu}
                            onChange={(e) => setProductDescu(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Agregar Producto
                    </button>
                </form>
                {/* Botón para regresar al dashboard */}
                <div className="mt-4">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-full bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
                    >
                        Regresar al Dashboard
                    </button>
                </div>
            </div>

            <div>
                {/* Alert mensaje*/}
                {showAlertSusses && (
                    <div className="mt-4 alert alert-success">
                        Producto agregado exitosamente!
                    </div>
                )}
            </div >

            <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center p-4">
                {showAlertError && (
                    <div className="bg-red-500 text-white px-4 py-3 rounded-md">
                        El producto ya existe.
                    </div>
                )}
            </div>



        </>
    );
};

export default Add;




