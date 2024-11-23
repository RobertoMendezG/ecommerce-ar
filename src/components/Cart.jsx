import React, { createContext, useContext, useState } from 'react';


const Cart = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCart((prevCart) => [...prevCart, producto]);
    };

    return (
        <Cart.Provider value={{ cart, agregarAlCarrito }}>
            {children}
        </Cart.Provider>
    );
};



export const useCart = () => {
    return useContext(Cart);
};