import React from 'react';
import { useCart } from './Cart';
import { MdDeleteForever } from "react-icons/md";

const CartView = () => {
    const { cart, quitarDelCarrito } = useCart();

    // Calcular el total de los productos con convercion a numero
    const calcularTotal = () => {
        return cart.reduce((total, producto) => total + Number(producto.precio), 0);
    };

    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((producto, index) => (
                            <li key={index}>
                                {producto.nombre} - ${producto.precio}
                                <button onClick={() => quitarDelCarrito(index)}>
                                    <MdDeleteForever className='ml-3 text-xl' />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h2>Total: ${calcularTotal()}</h2>
                </>
            )}
        </div>
    );
};

export default CartView;