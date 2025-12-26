import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // Ajusta la ruta a tu config
import { collection, getDocs, updateDoc, doc, orderBy, query } from "firebase/firestore";

const PedidosAdm = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Cargar las órdenes desde Firestore
    const fetchOrders = async () => {
        try {
            const ordersRef = collection(db, "orders");
            // Las ordenamos por fecha (la más reciente primero)
            const q = query(ordersRef, orderBy("fecha", "desc"));
            const querySnapshot = await getDocs(q);
            
            const docs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setOrders(docs);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener pedidos:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // 2. Función para cambiar el estado del pedido
    const cambiarEstado = async (id, nuevoEstado) => {
        try {
            const orderDoc = doc(db, "orders", id);
            await updateDoc(orderDoc, { estado: nuevoEstado });
            
            // Actualizamos el estado local para no tener que recargar la página
            setOrders(orders.map(order => 
                order.id === id ? { ...order, estado: nuevoEstado } : order
            ));
            
            alert(`Pedido actualizado a: ${nuevoEstado}`);
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    if (loading) return <div className="p-10">Cargando pedidos...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Gestión de Pedidos</h1>
            
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-left bg-white">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4">ID Pedido</th>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Productos</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Estado</th>
                            <th className="p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 text-sm text-gray-500">...{order.id.slice(-6)}</td>
                                <td className="p-4">
                                    <p className="font-semibold">{order.buyer.nombre} {order.buyer.apellido}</p>
                                    <p className="text-xs text-gray-400">{order.buyer.email}</p>
                                </td>
                                <td className="p-4">
                                    <ul className="text-sm">
                                        {order.items.map((item, i) => (
                                            <li key={i}>• {item.nombre}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="p-4 font-bold">${order.total.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        order.estado === 'pagado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {order.estado.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {order.estado === 'pagado' && (
                                        <button 
                                            onClick={() => cambiarEstado(order.id, 'enviado')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Marcar como Enviado
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PedidosAdm;