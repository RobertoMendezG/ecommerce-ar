import React from "react";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/config";

const Product = () => {





    return (
        <section className="container mx-auto px-4 ">
            <h2 className="mb-4 text-3xl font-bold">Sansumg pro S23</h2>
            <p className="mb-5 text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatibus delectus quam!
                Sed itaque assumenda ex nisi tenetur. Adipisci corporis atque labore, eius pariatur libero
                amet deleniti eaque sunt obcaecati.
            </p>
            <div className="grid grid-cols-4 items-center gap-40 font-bold mb-5">

                <span className="text-3xl">$1300.00</span>
                <span className="mr-auto rounded-md bg-purple-200 py-1 px-2 text-purple-700">10%</span>

                <span className="text-right text-lg text-gray-300 line-through">$1800.99</span>
            </div>
            <div className="grid grid-cols-3 font-bold">
                <div className="col-span-3 flex items-baseline justify-between rounded-md bg-gray-200 pb-3 py-2 px-5">
                    <button className="text-3xl text-violet-600 ">-</button>
                    <span className="text-xl">0</span>
                    <button className="text-3xl text-violet-600">+</button>
                </div>
                <button className="col-span-3 flex rounded-md bg-violet-600 hover:bg-violet-500 py-3 items-center gap-x-3 mt-5 justify-center text-white"> <FaCartPlus /> <span>Agregar a carrito</span></button>
            </div>

        </section>
    );
}

export default Product;