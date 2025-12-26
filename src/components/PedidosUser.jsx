import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const PedidosUser = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyOrders = async () => {
            // Verificamos que el usuario esté logueado
            const user = auth.currentUser;
            
            if (user) {
                try {
                    const ordersRef = collection(db, "orders");
                    // Filtramos: Solo pedidos donde buyer.uid coincida con el usuario actual
                    const q = query(
                        ordersRef, 
                        where("buyer.uid", "==", user.uid),
                        orderBy("fecha", "desc")
                    );

                    const querySnapshot = await getDocs(q);
                    const docs = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setOrders(docs);
                } catch (error) {
                    console.error("Error al obtener mis pedidos:", error);
                }
            }
            setLoading(false);
        };

        fetchMyOrders();
    }, []);

    if (loading) return <div className="p-10 text-center">Cargando tus pedidos...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Mis Compras</h1>

            {orders.length === 0 ? (
                <div className="bg-blue-50 p-6 rounded-lg text-blue-800">
                    Aún no has realizado ninguna compra.
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start border-b pb-3 mb-3">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">ID del Pedido</p>
                                    <p className="text-sm font-mono text-gray-700">#{order.id}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        order.estado === 'pagado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {order.estado.toUpperCase()}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {order.fecha?.toDate().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{item.nombre}</span>
                                        <span className="font-semibold">${Number(item.precio).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-3 border-t flex justify-between items-center">
                                <span className="font-bold text-gray-800 text-lg">Total Pagado:</span>
                                <span className="font-bold text-green-600 text-xl">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PedidosUser;