
import express from "express";
import cors from "cors";
import mercadopago from "mercadopago"; 

mercadopago.configure({
    access_token: "TEST-4182127145425714-120508-5011efbfb1a47f4533afb1bc623524cd-2139724622",
});

const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

// Ruta verificar el servidor
app.get("/", (req, res) => {
    res.send("Soy server :)");
});

app.post("/create_preference", async (req, res) => {
    try {
        const { title, unit_price, quantity } = req.body;

        if (!title || !unit_price || !quantity) {
            return res.status(400).json({ error: "Faltan datos en la solicitud." });
        }

        const preference = {
            items: [
                {
                    title: title,
                    unit_price: Number(unit_price),
                    quantity: Number(quantity),
                    currency_id: "MXN",
                },
            ],
            back_urls: {
                success: "http://ecommerce-ar-alpha.vercel.app",  
                failure: "http://ecommerce-ar-alpha.vercel.app",  
                pending: "http://ecommerce-ar-alpha.vercel.app", 
            },
            auto_return: "approved",
        };

        // Crear preferencia en Mercado Pago
        const result = await mercadopago.preferences.create(preference);

        res.json({ id: result.body.id });
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        res.status(500).json({ error: "Error al crear la preferencia." });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
