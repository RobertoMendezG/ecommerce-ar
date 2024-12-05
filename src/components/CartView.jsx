import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from './Cart';
import { MdDeleteForever } from "react-icons/md";

const CartView = () => {
    const { cart, quitarDelCarrito, vaciarCarrito  } = useCart();
    const navigate = useNavigate();
    const [paypalReady, setPaypalReady] = useState(false);
    

    const calcularTotal = () => {
        return cart.reduce((total, producto) => total + Number(producto.precio), 0);
    };

    // constante para manejar el pago de paypal
    const handlePayPalPayment = () => {
        const total = calcularTotal();
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total.toFixed(2)
                        }
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                    alert('Pago realizado con éxito por ' + details.payer.name.given_name);
                    vaciarCarrito();
                });
            },
            onError: (err) => {
                console.error('Error en el pago: ', err);
                // muestra el alert si hay un error en el proceso de pago
                if (cart.length > 0) {
                    alert('Ocurrió un error durante el proceso de pago.');
                }
            }
        }).render('#paypal-button-container'); 
    };

    useEffect(() => {
        if (window.paypal && !paypalReady && cart.length > 0) {
            handlePayPalPayment();
            setPaypalReady(true);
        }
    }, [paypalReady, cart]); 

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

                    {/* botón de PayPal */}
                    <div id="paypal-button-container" className='mt-1'></div>
                </>
            )}
        </div>
    );
};

export default CartView;