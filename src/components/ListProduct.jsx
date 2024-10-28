import React, { useState, useEffect } from "react";
import db from "../firebase/config"; // Firebase configuration
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
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

  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteDoc(doc(db, "productos", productIdToDelete));
    setShowModal(false);
    // Actualizar la lista de productos después de la eliminación
    setProducts(products.filter((product) => product.id !== productIdToDelete));
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4 bg-beige min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Productos</h1>
      <div className="flex justify-center mb-4">
        <Link to={"/admin"}>
          <button className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            <IoIosAddCircle className="mr-2" /> Agregar Producto
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-violet-600 text-white font-medium text-center">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3">Descuento</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="px-4 py-3">{product.nombre}</td>
                <td className="px-4 py-3">{product.precio}</td>
                <td className="px-4 py-3">
                  {product.imagen && (
                    <img src={product.imagen} alt={product.nombre} className="h-16 w-16 object-cover mx-auto" />
                  )}
                </td>
                <td className="px-4 py-3">{product.descripcion}</td>
                <td className="px-4 py-3 text-center">{product.descuento}</td>
                <td className="px-4 py-3 text-center flex justify-center items-center space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded"
                    onClick={() => console.log("Editar producto:", product.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="text-lg mb-4">¿Estás seguro de que deseas eliminar este producto?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
              >
                Sí
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProducts;
