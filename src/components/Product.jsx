
import React from "react";


const Product = () => {
    return <main className="grid grid-cols-1 md-grid-cols-2 gap-8">
        <section>Imagen</section>
        <section className="container mx-auto px-4 ">
            <h2 className="mb-4 text-3xl font-bold">Sansumg pro S23</h2>
            <p className="mb-5 text-dark-grayish-blue">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatibus delectus quam! 
                Sed itaque assumenda ex nisi tenetur. Adipisci corporis atque labore, eius pariatur libero 
                amet deleniti eaque sunt obcaecati.
            </p>

            <p>
                <span>$1300.00</span>
                <span>10%</span>
            </p>
            <p>$1800.99</p>
            <div>
                <div>
                    <button>-</button>
                    <span>0</span>
                    <button>+</button>
                </div>
                <button>Agregar a carrito</button>
            </div>

        </section>
    </main>
}

export default Product;