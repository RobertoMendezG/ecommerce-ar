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

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Actualizar Producto</h2>
            {/* Formulario para actualizar el producto */}
            <input
                type="text"
                value={product.nombre}
                onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
            />
            <input
                type="number"
                value={product.precio}
                onChange={(e) => setProduct({ ...product, precio: e.target.value })}
            />
            <input
                type="text"
                value={product.descripcion}
                onChange={(e) => setProduct({ ...product, descripcion: e.target.value })}
            />
            <input
                type="text"
                value={product.imagen}
                onChange={(e) => setProduct({ ...product, imagen: e.target.value })}
            />
            <input
                type="text"
                value={product.descripcion}
                onChange={(e) => setProduct({ ...product, descripcion: e.target.value })}
            />
            <input
                type="number"
                value={product.descuento}
                onChange={(e) => setProduct({ ...product, descuento: e.target.value })}
            />
            <button onClick={handleUpdate}>Actualizar</button>
        </div>
    );
};

export default ProductEdit;

    

