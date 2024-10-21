import React, { useState, useEffect } from "react";
import db from "../firebase/config"; // Firebase configuration
import { collection, getDocs, addDoc } from "firebase/firestore";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = useState([]); 

 
  useEffect(() => {
    const getProducts = async () => {
      const productsCollection = collection(db, "productos");
      const querySnapshot = await getDocs(productsCollection); 

      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(fetchedProducts); 
    };

    getProducts(); 
  }, []); 




  return (
    <>
    <h2 className="mr-2">Productos</h2> 
    <Link to={"/admin"} >
     <button><IoIosAddCircle /></button>
     </Link>
      <table className="table-auto w-full bg-violet-400">
      <thead>
        <tr className="bg-violet-600 text-white text-left font-medium">
          <th className="px-4 py-3 text-center">Nombre</th>
          <th className="px-4 py-3 text-center">Precio</th>
          <th className="px-4 py-3 text-center">Imagen</th>
          <th className="px-4 py-3 text-center">Descripción</th>
          <th className="px-4 py-3 text-center">Descuento</th>
          <th className="px-4 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-v">
            <td className="px-4 py-3">{product.nombre}</td>
            <td className="px-4 py-3">{product.precio}</td>
            <td className="px-4 py-3">
              {product.imagen && <img src={product.imagen} alt={product.nombre} />}
            </td>
            <td className="px-4 py-3">{product.descripcion}</td>
            <td className="px-4 py-3 text-center">{product.descuento}</td>
            <td className="px-4 py-3">
            
              <button className="px-2 py-1 bg-blue-500 hover:bg-blue-400 text-white text-center items-center rounded ">Editar</button>
              <button className="px-2 py-1 bg-red-500 hover:bg-red-400 text-white  text-center items-center rounded ">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};


export default ListProducts;