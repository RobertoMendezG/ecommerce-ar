import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from './Cart';
import { MdDeleteForever } from "react-icons/md";
// --- 1. IMPORTACIONES DE FIREBASE ---
import { db, auth } from '../firebase/config'; // Verifica que esta ruta sea la correcta en tu proyecto
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CartView = () => {
    const { cart, quitarDelCarrito, vaciarCarrito } = useCart();
    const navigate = useNavigate();

    const calcularTotal = () => {
        return cart.reduce((total, producto) => total + Number(producto.precio), 0);
    };

    useEffect(() => {
        const renderPayPalButtons = async () => {
            const container = document.getElementById('paypal-button-container');
            
            if (container) container.innerHTML = "";

            if (window.paypal && cart.length > 0) {
                try {
                    await window.paypal.Buttons({
                        createOrder: (data, actions) => {
                            const currentTotal = cart.reduce((total, p) => total + Number(p.precio), 0);
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: currentTotal.toFixed(2)
                                    }
                                }]
                            });
                        },
                        onApprove: async (data, actions) => {
                            // --- 2. CAPTURAR EL PAGO ---
                            const details = await actions.order.capture();
                            
                            try {
                                // --- 3. CREAR EL OBJETO DE LA ORDEN ---
                                const nuevaOrden = {
                                    buyer: {
                                        uid: auth.currentUser?.uid || "invitado",
                                        email: auth.currentUser?.email || details.payer.email_address,
                                        nombre: details.payer.name.given_name,
                                        apellido: details.payer.name.surname
                                    },
                                    items: cart.map(p => ({
                                        id: p.id || 'n/a',
                                        nombre: p.nombre,
                                        precio: p.precio
                                    })),
                                    total: calcularTotal(),
                                    id_transaccion: details.id, // ID de PayPal
                                    estado: "pagado",
                                    fecha: serverTimestamp()
                                };

                                // --- 4. GUARDAR EN FIRESTORE ---
                                const docRef = await addDoc(collection(db, "orders"), nuevaOrden);

                                alert('¡Pago exitoso! Orden registrada con ID: ' + docRef.id);
                                
                                vaciarCarrito();
                                navigate("/"); // Redirigir al inicio o a una página de "Gracias"

                            } catch (error) {
                                console.error("Error al guardar la orden en Firebase:", error);
                                alert("El pago se realizó pero hubo un error al registrar el pedido.");
                            }
                        },
                        onError: (err) => {
                            console.error('Error en el pago: ', err);
                            if (cart.length > 0) {
                                alert('Ocurrió un error durante el proceso de pago.');
                            }
                        }
                    }).render('#paypal-button-container');
                } catch (error) {
                    console.error("Error renderizando PayPal:", error);
                }
            }
        };

        renderPayPalButtons();

        return () => {
            const container = document.getElementById('paypal-button-container');
            if (container) container.innerHTML = "";
        };

    }, [cart, vaciarCarrito, navigate]); 

    return (
        <div className='ml-10'>
            <h1 className='mt-5 text-2xl font-bold'>Tu Carrito</h1>
            {cart.length === 0 ? (
                <p className='mt-4'>No hay productos en el carrito.</p>
            ) : (
                <>
                    <ul className='mt-4'>
                        {cart.map((producto, index) => (
                            <li key={index} className="flex items-center justify-between mr-8 p-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                                <img
                                    className="w-20 h-20 object-contain rounded-md border border-gray-100"
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                />
                                <div className="flex-1 px-4">
                                    <h3 className="font-semibold text-gray-800 text-lg">
                                        {producto.nombre}
                                    </h3>
                                </div>
                                <div className="font-bold text-gray-900 text-lg mr-4">
                                    ${Number(producto.precio).toFixed(2)}
                                </div>
                                <button
                                    onClick={() => quitarDelCarrito(index)}
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
                                    title="Eliminar producto"
                                >
                                    <MdDeleteForever className='text-2xl' />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t mt-4 mr-20 pt-2 flex justify-end">
                        <h2 className='mt-2 font-bold text-xl'>
                            Total: ${calcularTotal().toFixed(2)}
                        </h2>
                    </div>

                    <div className="mt-8 w-full max-w-md mx-auto mb-10">
                        <div id="paypal-button-container"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartView;