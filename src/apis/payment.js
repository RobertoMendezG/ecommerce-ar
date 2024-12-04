import express from "express";
import cors from "cors";

//SDK Mercado pago
import {MercadoPagoConfig, preference} from "mercadopago";
import { revokeAccessToken } from "firebase/auth";

const Client = new MercadoPagoConfig({
    accessToken : "TEST-8519739731413816-112717-40190d7d1243ecad8ffa01b337bcfef8-2123095852",
});
const app = express();
const port = process.env.PORT;

app.use (cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("soy server :)")
})

app.post("./create_preference", async (req, res) => {
    try {
        const body ={
            items: [
                {
                    title: req.body.title,
                    quantunit_price: Number(req.body.quantunit_price), 
                    quantity: Number (req.body.quantity),
                    currency_id: "MX",
                },
            ],
            back_urls: {
                success:"https://ecommerce-ar-alpha.vercel.app/",
                failure: "https://ecommerce-ar-alpha.vercel.app/",
                pending: "https://ecommerce-ar-alpha.vercel.app/",
            },
            auto_retun: "aproved",
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json ({
            id: result.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"error al crear la preferencia :( ",
        });
    }
});
app.listen(port, () => {
    console.log('el servidor esta corriendo en el puerto ${port}');
});