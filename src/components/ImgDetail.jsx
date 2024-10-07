
import imagen1 from "../assets/celular2.jpg"
import React from "react";


const ImgDetail = () => {
    return (

        <section className="grid md:grid-cols-1 md:gap-8">
            <div className="col-span-4">
                <img src={imagen1} alt="" width={"500px"} height={"300px"} />
            </div>
        </section>


    );
}

export default ImgDetail;