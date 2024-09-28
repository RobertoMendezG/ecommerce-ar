
import React from "react";
import { NavbarMenu } from "../mockData/data";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { SiDigikeyelectronics } from "react-icons/si";
import { MdMenu } from "react-icons/md";
import {ResponsiveMenu} from "../components/ResponsiveMenu";

const Navbar = () => {
    const [open,setOpen]= React.useState(false);
    return( 
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
                    {
                        NavbarMenu.map((item) => {
                            return <li key={item.id}>
                                <a href={item.link} className="incline-block py-1 px-3 hover:text-primary font-semibold">{item.title}</a>
                            </li>;
                        })
                    }
                </ul>
            </div>
            {/*iconos*/}
            <div className="flex items-center gap-4 text-white">
                <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
                    <CiSearch className="text-2xl" />
                </button>
                <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
                    <CiShoppingCart className="text-2xl" />
                </button>
                <button className="hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-2 border-primary px-6 py2 duration-200 hidden md:block">Login</button>
            </div>
            {/*movil hamburger*/}
            <div className="md:hidden "onClick={()=>
                setOpen(!open)
            }>
                <MdMenu className="text-4xl"/>
            </div>
        </div>
    



    {/*movil seccion hamburger*/}
    <ResponsiveMenu  open={open} />

    </nav>
    </>
    );
}

export default Navbar;