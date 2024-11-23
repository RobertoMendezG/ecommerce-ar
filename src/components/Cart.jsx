import React, { createContext, useContext, useState } from 'react';


const Cart = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCart((prevCart) => [...prevCart, producto]);
    };

    const quitarDelCarrito = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    return (
        <Cart.Provider value={{ cart, agregarAlCarrito, quitarDelCarrito  }}>
            {children}
        </Cart.Provider>
    );
};



export const useCart = () => {
    return useContext(Cart);
};