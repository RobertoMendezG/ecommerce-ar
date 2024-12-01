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
        <div className='ml-10'>
            <h1 className='mt-12'>Carrito de Compras</h1>
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
                    <h2 className='mt-2'>Total: ${calcularTotal()}</h2>

                  <button
                        className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-3 px-2 rounded-full sm:px-3 sm:py-3 md:px-4 md:py-2 mb-10 mt-2'
                    >
                        Pagar ahora
                    </button>
                </>
            )}
        </div>
    );
};

export default CartView
