import React, { useState, useEffect } from 'react';
import db from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

const ProductEdit = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const productDoc = doc(db, 'productos', id);
            const productSnapshot = await getDoc(productDoc);
            if (productSnapshot.exists()) {
                setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    const handleUpdate = async () => {
        const productDoc = doc(db, 'productos', id);
        await updateDoc(productDoc, product);
        navigate('/ProductList');
    };

    if (loading) return <div className="text-center">Cargando...</div>;

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">Actualizar Producto</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={product.nombre}
                        onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="precio">Precio</label>
                    <input
                        type="number"
                        id="precio"
                        value={product.precio}
                        onChange={(e) => setProduct({ ...product, precio: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="descripcion">Descripción</label>
                    <input
                        type="text"
                        id="descripcion"
                        value={product.descripcion}
                        onChange={(e) => setProduct({ ...product, descripcion: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="imagen">Imagen URL</label>
                    <input
                        type="text"
                        id="imagen"
                        value={product.imagen}
                        onChange={(e) => setProduct({ ...product, imagen: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="descuento">Descuento</label>
                    <input
                        type="number"
                        id="descuento"
                        value={product.descuento}
                        onChange={(e) => setProduct({ ...product, descuento: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default ProductEdit;