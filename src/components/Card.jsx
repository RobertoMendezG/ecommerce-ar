
import React,{ useEffect, useState } from "react";
import imagen1 from "../assets/celular2.jpg"
import { FaEye } from "react-icons/fa";

const Card = () => {



    return (
        <>
            <div className="h-screen  bg-gray-100 flex items-center justify-center gap-10">

                {/* tarjeta de producto */}
                <div className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-mb overflow-hidden rounded-3xl">
                    <img className="w-full h-full object-cover" src={imagen1} alt="" />

                    <div className="p-5 flex flex-col gap-3">


                        {/* nombre de producto */}

                        <h2 className="product-title">
                            Sansumng pro S23
                        </h2>

                        {/* precio de producto */}
                        <div>
                            <span className="text-xl font-bold">
                                $1300.00
                            </span>

                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm line-through opacity-50">
                                    $1800.99
                                </span>
                                <span className="descuento-product">Descuento de 10%</span>
                            </div>
                        </div>

                        {/* boton agregar producto */}

                        <div className="mt-5 flex gap-2">
                            <button className="button-primary">Agregar a carrito</button>
                            <a href="../pages/DetailProduct.jsx" className="button-icon" >
                            <button ><FaEye /></button>
                            </a>
                        </div>



                    </div>
                </div>
                {/* tarjeta de producto */}
                <div className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-mb overflow-hidden rounded-3xl">
                    <img className="w-full h-full object-cover" src={imagen1} alt="" />

                    <div className="p-5 flex flex-col gap-3">


                        {/* nombre de producto */}

                        <h2 className="product-title">
                            Sansumng pro S23
                        </h2>

                        {/* precio de producto */}
                        <div>
                            <span className="text-xl font-bold">
                                $1300.00
                            </span>

                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm line-through opacity-50">
                                    $1800.99
                                </span>
                                <span className="descuento-product">Descuento de 10%</span>
                            </div>
                        </div>

                        {/* boton agregar producto */}

                        <div className="mt-5 flex gap-2">
                            <button className="button-primary">Agregar a carrito</button>
                            <a href="../pages/DetailProduct.jsx" className="button-icon" >
                            <button ><FaEye /></button>
                            </a>
                        </div>



                    </div>
                </div>
                {/* tarjeta de producto */}
                <div className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-mb overflow-hidden rounded-3xl">
                    <img className="w-full h-full object-cover" src={imagen1} alt="" />

                    <div className="p-5 flex flex-col gap-3">
                        

                        {/* nombre de producto */}

                        <h2 className="product-title">
                            Sansumng pro S23
                        </h2>

                        {/* precio de producto */}
                        <div>
                            <span className="text-xl font-bold">
                                $1300.00
                            </span>

                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm line-through opacity-50">
                                    $1800.99
                                </span>
                                <span className="descuento-product">Descuento de 10%</span>
                            </div>
                        </div>

                        {/* boton agregar producto */}

                        <div className="mt-5 flex gap-2">
                            <button className="button-primary">Agregar a carrito</button>
                            <a href="../pages/DetailProduct.jsx" className="button-icon" >
                            <button ><FaEye /></button>
                            </a>
                        </div>



                    </div>
                </div>
                {/* tarjeta de producto */}
                <div className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-mb overflow-hidden rounded-3xl">
                    <img className="w-full h-full object-cover" src={imagen1} alt="" />

                    <div className="p-5 flex flex-col gap-3">
                        

                        {/* nombre de producto */}

                        <h2 className="product-title">
                            Sansumng pro S23
                        </h2>

                        {/* precio de producto */}
                        <div>
                            <span className="text-xl font-bold">
                                $1300.00
                            </span>

                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm line-through opacity-50">
                                    $1800.99
                                </span>
                                <span className="descuento-product">Descuento de 10%</span>
                            </div>
                        </div>

                        {/* boton agregar producto */}

                        <div className="mt-5 flex gap-2">
                            <button className="button-primary">Agregar a carrito</button>
                            <a href="../pages/DetailProduct.jsx" className="button-icon" >
                            <button ><FaEye /></button>
                            </a>
                        </div>



                    </div>
                </div>

            </div>
        </>
    );
}

export default Card;