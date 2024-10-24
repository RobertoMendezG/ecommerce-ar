import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { SiDigikeyelectronics } from "react-icons/si";
import { MdMenu } from "react-icons/md";
import { ResponsiveMenu } from "../components/ResponsiveMenu";
import db from "../firebase/config";
import { getAuth, signOut } from "firebase/auth";


const Navbar = () => {



    const [open, setOpen] = React.useState(false);
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
                                <Link to={"/"} >
                                    Ofertas
                                </Link>
                            </button>
                            </li>
                            <li><button  className="incline-block py-1 px-3 hover:text-blue-800 font-semibold" href="">
                                <Link to={"/"} >
                                    cerrar sesion
                                </Link>
                            </button>
                            </li>

                        </ul>
                    </div>
                    {/*iconos*/}
                    <div className="flex items-center gap-4 text-white">
                        <button className="text-2xl hover:bg-blue-800 hover:text-white rounded-full p-2 duration-200">
                            <CiSearch className="text-3xl" />
                        </button>
                        <button className="text-2xl hover:bg-blue-800 hover:text-white rounded-full p-2 duration-200">
                            <CiShoppingCart className="text-3xl" />
                        </button>
                        <button className="hover:bg-blue-800 text-white font-semibold hover:text-white rounded-md border-2 border-white px-6 py2 duration-200 hidden md:block">
                            <Link to={"/Login"} >
                                Login
                            </Link>
                        </button>
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
