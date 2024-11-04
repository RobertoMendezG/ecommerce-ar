import React, { useState } from "react";
import db from "../firebase/config"; // Asegúrate de importar tu configuración de Firebase
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";

const Add = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescr, setProductDescr] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productDescu, setProductDescu] = useState("");
    const [showAlertSusses, setShowAlertSusses] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);


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

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Agregar Producto
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <form className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre del producto"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Precio del producto"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="URL imagen de producto"
                                value={productImage}
                                onChange={(e) => setProductImage(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Descripción del producto"
                                value={productDescr}
                                onChange={(e) => setProductDescr(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Descuento del producto"
                                value={productDescu}
                                onChange={(e) => setProductDescu(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={handleAddProduct}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Agregar Producto
                            </button>
                        </div>

                    </form>
                </div>
                {/* Alert message (conditionally rendered) */}
                {showAlertSusses && (
                    <div className="mt-4 alert alert-success">
                        Producto agregado exitosamente!
                    </div>
                )}
            </div>

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
