import React from "react";
import { motion, AnimatePresence } from "framer-motion"

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

                    <div className="text-xl font-semibold uppercase bg-blue-800 text-white py-10 m-6 rounded-3xl">
                        <ul className="flex flex-col justify-center items-center gap-10 text-white">
                            <li><a href="">Inicio</a></li>
                            <li><a href="">Productos</a></li>
                            <li><a href="">Ofertas</a></li>
                            <li><a href="">Conocenos</a></li>
                        </ul>
                    </div>
                </motion.div>
            )
        }
    </AnimatePresence>
};
