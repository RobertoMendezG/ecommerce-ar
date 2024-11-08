import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { SiDigikeyelectronics } from "react-icons/si";
import { MdMenu } from "react-icons/md";
import { ResponsiveMenu } from "../components/ResponsiveMenu";
import { auth } from '../firebase/config'; 
import { signOut } from 'firebase/auth';

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [user, setUser ] = useState(null);

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
            console.log('Sesión cerrada');
        } catch (error) {
            console.error('Error al cerrar sesión: ', error);
        }
    };


    return (
        <>
            <nav >
                <div className="container flex justify-between items-center py-0">
                    {/*logo*/}
                    <div className="text-2xl flex text-white items-center gap-2 font-bold py-8 uppercase">
                        <SiDigikeyelectronics />
                        <p>Electronicos</p>
                    </div>
                    {/*menu*/}
                    <div className="hidden md:block">


                        <ul className="flex items-center gap-6 text-white">
                            <li><button className="incline-block py-1 px-3 hover:text-blue-800 font-semibold" href="">
                                <Link to={"/"} >
                                    Inicio
                                </Link>
                            </button>
                            </li>
                            <li><button className="incline-block py-1 px-3 hover:text-blue-800 font-semibold" href="">
                                <Link to={"/"} >
                                    Productos
                                </Link>
                            </button>
                            </li>
                            <li><button className="incline-block py-1 px-3 hover:text-blue-800 font-semibold" href="">
                                <Link to={"/HomeOffers"} >
                                    Ofertas
                                </Link>
                            </button>
                            </li>
                            <li><button className="incline-block py-1 px-3 hover:text-blue-800 font-semibold" href="">
                                <Link to={"/"} >
                                    Conocenos
                                </Link>
                            </button>
                            </li>

                        </ul>
                    </div>
                    {/*iconos*/}
                    <div className="flex items-center gap-4 text-white">
                        
                        <button className="text-2xl hover:bg-blue-800 hover:text-white rounded-full p-2 duration-200">
                            <CiShoppingCart className="text-3xl" />
                        </button>
                        {user ? (
                            <>
                                <span className="text-white">{user.email}</span>
                                <button
                                    className="hover:bg-blue-800 text-white font-semibold hover:text-white rounded-md border-2 border-white px-6 py-2 duration-200"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <Link to={"/Login"} className="hover:bg-blue-800 text-white font-semibold hover:text-white rounded-md border-2 border-white px-6 py-2 duration-200">
                                Login
                            </Link>
                        )}
                    </div>
                    {/*movil hamburger*/}
                    <div className="md:hidden " onClick={() =>
                        setOpen(!open)
                    }>
                        <MdMenu className="text-4xl text-white" />
                    </div>
                </div>


                



                {/*movil seccion hamburger*/}
                <ResponsiveMenu open={open} />

            </nav>
        </>
    );
}

export default Navbar;
