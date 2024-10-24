
import React from "react";
import { NavbarMenu } from "../mockData/data";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { SiDigikeyelectronics } from "react-icons/si";
import { MdMenu } from "react-icons/md";
import {ResponsiveMenu} from "../components/ResponsiveMenu";

const Footer = () => {
    return <footer >
    <div className="grid grid-cols-1 sm-grid-cols-3 lg-grid-cols-4 gap-6 sm:px-8 px-5 py-16">
        <lu>
            <li>Servicios</li>
            <li>Inicio</li>
            <li>Productos</li>
            <li>Ofertas</li>
            <li>Conocenos</li>
        </lu>
     
        </div>
</footer>
}

export default Footer;
