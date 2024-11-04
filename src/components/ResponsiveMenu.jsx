import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { FaUser } from "react-icons/fa";

export const ResponsiveMenu = ({ open }) => {
    return <AnimatePresence mode="wait">
        {
            open && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-20 left-0 w-full h-screen z-20">

                    <div className="text-xl font-semibold uppercase bg-violet-700 text-white py-10 m-6 rounded-3xl">
                        <ul className="flex flex-col justify-center items-center gap-10 text-white">
                            <li><a href="/">
                            <Link to={"/"} >
                                    Inicio
                                </Link></a></li>
                            <li><a href="">Conocenos</a></li>
                            <li><a>
                            <Link to={"/HomeOffers"} >
                                    Ofertas
                                </Link></a></li>
                            <li> <a>
                            <Link to={"/Login"} >
                            Inicia sesion
                            </Link>
                        </a></li>
                        </ul>
                    </div>
                </motion.div>
            )
        }
    </AnimatePresence>
};
