import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiDigikeyelectronics } from "react-icons/si";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import ListProducts from './ListProduct';
import { MdMenu } from 'react-icons/md';

const AdminDashboard = () => {
    const [user, setUser ] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser (user);
            } else {
                setUser (null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Sesión cerrada'); // alert
            navigate('/'); // Redirige a la pagina de inicio
        } catch (error) {
            console.error('Error al cerrar sesión: ', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Botón de menú movil */}
            <div className="md:hidden p-4 z-20">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <MdMenu className="text-3xl text-whi-800" />
                </button>
            </div>

            {/* Menú de navegación */}
            <nav className={`bg-gray-800 text-white w-64 min-h-screen p-4 transition-transform duration-300 ease-in-out fixed md:relative ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="text-2xl flex items-center gap-2 font-bold py-4 uppercase">
                    <SiDigikeyelectronics className="text-xl mt-5" />
                    <p className="mt-7">Electronicos</p>
                </div>
                <ul className="space-y-2">
                    <li>
                        <Link to="/ViewDashboard" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-700">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-700">Agregar Producto</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="block py-2 px-4 hover:bg-gray-700 w-full text-left">Cerrar sesión</button>
                    </li>
                </ul>
            </nav>

            {/* Contenido principal */}
            <div className={`flex-1 p-6 transition-all duration-300 ${isMenuOpen ? 'bg-gray-200' : 'bg-white'} md:bg-white`}>
                <h1 className="text-3xl font-bold mb-4">Administración de productos</h1>
                <ListProducts />
            </div>
        </div>
    );
};

export default AdminDashboard;