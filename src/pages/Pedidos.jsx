import React from 'react';
// IMPORTANTE: Le cambiamos el nombre al import para que NO sea igual a la función
import PedidosAdm from "../components/PedidosAdm";

function Pedidos() {
    return (
        <div className="container mx-auto">
            {/* Llamamos al componente de la tabla que importamos arriba */}
            <PedidosAdm />
        </div>
    );
}

export default Pedidos;