import React from 'react';
import { useCart } from './Cart';
import { MdDeleteForever } from "react-icons/md";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
import { useState } from 'react';

    const CartView = () => {
    const { cart, quitarDelCarrito } = useCart();

    // Calcular el total de los productos con convercion a numero
    const calcularTotal = () => {
        return cart.reduce((total, producto) => total + Number(producto.precio), 0);
    };
    //mercado pago
    const [preferenceId, setPreferenceId] = useState (null)
    initMercadoPago('TEST-946fdf90-e2f3-4891-872b-cacf05e148d8', { 
        locale: "es-MX",
    });
    
    const createPreference = async () => {
        try {
            // Construir los datos con los productos del carrito
            const products = cart.map((producto) => ({
                title: producto.nombre,
              unit_price: parseFloat(producto.precio), // Convertir precio a número
              quantity: 1, // Asumiendo que cada producto tiene cantidad 1
            }));
        
            // Enviar los datos al backend
            const response = await axios.post("http: //localhost:3000/create_preference", {
                items: products,
            });
        
            // Obtener el ID de la preferencia (o la URL de pago)
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
        
    };
    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
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

                    <button onClick={handleBuy}
                        className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-3 px-2 rounded-full sm:px-3 sm:py-3 md:px-4 md:py-2 mb-10 mt-2'
                    >
                        Pagar ahora
                    </button>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
                    
                </>
            )}
        </div>
    );
};

export default CartView
