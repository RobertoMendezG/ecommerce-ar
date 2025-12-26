import React from 'react';
import Pedidos from "../components/PedidosUser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MisPedidos() {
    return (
        
              <div className="">
                <div className="overflow-x-hidden bg-gray-900">
                  <Navbar />
                </div>
              
              
                <div className="container mx-auto">
            <Pedidos />
        </div>
        
        
                
              </div>
        
    );
}

export default MisPedidos;