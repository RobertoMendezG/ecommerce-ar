
import React from "react";
import { NavbarMenu } from "../mockData/data";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { SiDigikeyelectronics } from "react-icons/si";
import { MdMenu } from "react-icons/md";
import {ResponsiveMenu} from "../components/ResponsiveMenu";

const Card = () => {
    return( 
        <>
        <div className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-mb overflow-hidden">
            <img className="w-full h-full object-cover" src="../assets/celular.jpg" alt="" />
        </div>
        
        </>
    );
}

export default Card;