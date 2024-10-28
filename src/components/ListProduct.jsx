import React, { useState, useEffect } from "react";
import db from "../firebase/config"; // Firebase configuration
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { SiAnsys } from "react-icons/si";

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

  //funcion para eliminar productos

  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteDoc(doc(db, "productos", productIdToDelete));
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };





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

                <button className="px-2 py-1 bg-blue-500 hover:bg-blue-400 text-white text-center items-center rounded">
                  <Link to={`/ProductEdit/${product.id}`} className=""> Editar</Link>
                </button>
                <button className="px-2 py-1 bg-red-500 hover:bg-red-400 text-white text-center items-center rounded" onClick={() => handleDelete(product.id)}>Eliminar</button>

                {/* alert para confirmar eliminacion */}
                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6">

                      <p>¿Estás seguro de que deseas eliminar este producto?</p>
                      <div className="flex mt-4">
                        <button onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Sí
                        </button>
                        <button onClick={handleCancelDelete} className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* alert para confirmar eliminacion */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </>
  );
};


export default ListProducts;