import React from 'react';
import { CartProvider, useCart } from './CartContext';

const Producto = ({ producto }) => {
    const { agregarAlCarrito } = useCart();
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
            <h3 className="text-lg font-bold text-black mb-2">{producto.nombre}</h3>
            <button
                className="bg-violet-500 text-white py-2 px-4 rounded-full hover:bg-violet-600 transition"
                onClick={() => agregarAlCarrito(producto)}
            >
                Agregar al carrito
            </button>
        </div>
    );
};

const Carrito = () => {
    const { cart, quitarDelCarrito } = useCart();
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-black mb-4">Carrito</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Tu carrito está vacío.</p>
            ) : (
                cart.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-4 border-b last:border-none"
                    >
                        <p className="text-black">{item.nombre}</p>
                        <button
                            className="bg-violet-500 text-white py-1 px-3 rounded-full hover:bg-violet-600 transition"
                            onClick={() => quitarDelCarrito(index)}
                        >
                            Eliminar
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

function App() {
    const productos = [
        { id: 1, nombre: 'Producto 1' },
        { id: 2, nombre: 'Producto 2' },
    ];

    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">
                    Tienda
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productos.map((producto) => (
                        <Producto key={producto.id} producto={producto} />
                    ))}
                </div>
                <div className="mt-10 max-w-md mx-auto">
                    <Carrito />
                </div>
            </div>
        </CartProvider>
    );
}

export default App;
