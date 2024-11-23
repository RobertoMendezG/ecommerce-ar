
import React from 'react';
import { useCart } from './Cart';

const CartView = () => {
    const { cart } = useCart();

    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul>
                    {cart.map((producto, index) => (
                        <li key={index}>{producto.nombre} - ${producto.precio}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartView;