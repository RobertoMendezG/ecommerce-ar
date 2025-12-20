import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from './Cart';
import { MdDeleteForever } from "react-icons/md";

const CartView = () => {
    const { cart, quitarDelCarrito, vaciarCarrito } = useCart();
    const navigate = useNavigate();
    const [preferenceId, setPreferenceId] = useState(null);  
    const [paypalReady, setPaypalReady] = useState(false);

    const calcularTotal = () => {
        return cart.reduce((total, producto) => total + Number(producto.precio), 0);
    };

    //----------------------mercado pago------------------------------------------

    const initMercadoPagoBricks = async () => {
        if (!window.MercadoPago) {
            console.error("Mercado Pago no está disponible.");
            return;
        }

        if (!preferenceId) return;

        const mp = new window.MercadoPago('TEST-946fdf90-e2f3-4891-872b-cacf05e148d8'); 
        const bricksBuilder = mp.bricks();

        try {
            await bricksBuilder.create("wallet", "wallet_container", {
                initialization: {
                    preferenceId: preferenceId,
                },
                customization: {
                    texts: {
                        valueProp: 'smart_option',
                    },
                },
            });
        } catch (error) {
            console.error("Error al inicializar el widget de Mercado Pago:", error);
        }
    };

    const fetchPreferenceId = async () => {
        try {
            const response = await fetch("http://localhost:5174/create_preference", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "Compra en ecommerce",
                    unit_price: calcularTotal(),
                    quantity: 1,
                }),
            });
            const data = await response.json();
            console.log("Preference ID recibido:", data.id);  
            setPreferenceId(data.id);
        } catch (error) {
            console.error("Error al obtener el preferenceId:", error);
        }
    };

    useEffect(() => {
        fetchPreferenceId();
    }, []);  

    useEffect(() => {
        if (preferenceId && window.MercadoPago) {
            initMercadoPagoBricks();
        }
    }, [preferenceId]); 
    
    useEffect(() => {
        if (!window.MercadoPago) {
            console.error("El SDK de Mercado Pago no está disponible.");
        }
    }, []);
    
//----------------------PayPal-----------------------
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
            <h1 className='mt-40'>Carrito de Compras</h1>
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
                    {/* Botón Mercado Pago */}
                    <div id="wallet_container" className="mt-5"></div>
                    {/* botón de PayPal */}
<<<<<<< HEAD
                    <div id="paypal-button-container" className="mt-12 max-w-full flex justify-center items-center box-border"></div>
=======
                    <div id="paypal-button-container" className="mt-12 max-w-full flex justify-center items-center p-2 box-border"></div>
                    
>>>>>>> b58d11c06d5d5e8d927f564c0bfb0cbd8ab42c32
                </>
            )}
        </div>
    );
};

export default CartView;
<<<<<<< HEAD

=======
>>>>>>> b58d11c06d5d5e8d927f564c0bfb0cbd8ab42c32
