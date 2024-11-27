import React from 'react';
import { useCart } from './Cart';
import { MdDeleteForever } from "react-icons/md";

const CartView = () => {
    const { cart, quitarDelCarrito } = useCart();

    // Calcular el total de los productos con conversión a número
    const calcularTotal = () => {
        return cart.reduce((total, producto) => total + Number(producto.precio), 0);
    };

    // Manejar clic en un método de pago
    const handlePago = (metodoPago) => {
        navigate('/formPag', {
            state: { cart, total: calcularTotal(), metodoPago },
        });
    };

    return (
        <div className='ml-10'>
            <h1 className='mt-10'>Carrito de Compras</h1>
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

                    <div className='mt-4'>
                        <h3>Selecciona una forma de pago:</h3>
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={() => handlePago('bbva')}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full'
                            >
                                Pagar con BBVA
                            </button>
                            <button
                                onClick={() => handlePago('mercadoPago')}
                                className='bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-1 px-4 rounded-full'
                            >
                                Pagar con MercadoPago
                            </button>
                            <button
                                onClick={() => handlePago('oxxo')}
                                className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full'
                            >
                                Pagar en OXXO
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
