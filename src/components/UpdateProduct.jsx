import React, { useState } from "react";
import db  from "../firebase/config"; // Asegúrate de importar tu configuración de Firebase
import { collection, addDoc } from "firebase/firestore";


const Update = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescr, setProductDescr] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productDescu, setProductDescu] = useState("");

    const handleAddProduct = async () => {
        try {
            const docRef = await addDoc(collection(db, "productos"), {
                nombre: productName,
                precio: productPrice,
                imagen: productImage,
                descripcion: productDescr,
                descuento: productDescu,
            });
            console.log("Producto agregado con ID: ", docRef.id);
        } catch (e) {
            console.error("Error al agregar producto: ", e);
        }
    };

    return (
        <>
            <h2>Agregar Producto</h2>
            <input
                type="text"
                placeholder="Nombre del producto"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Precio del producto"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="URL imagen de producto"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
            />
            <input
                type="text"
                placeholder="Descripcion del producto"
                value={productDescr}
                onChange={(e) => setProductDescr(e.target.value)}
            />
            <input
                type="number"
                placeholder="Descuento del producto"
                value={productDescu}
                onChange={(e) => setProductDescu(e.target.value)}
            />
            <button onClick={handleAddProduct}>Agregar Producto</button>
        </>
    );
};

export default Update;