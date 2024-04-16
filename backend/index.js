import express from "express";
import cors from "cors";

/////SDK
import { MercadoPagoConfig, Preference } from "mercadopago";

///CONFIG
const client = new MercadoPagoConfig({
  accessToken: `${process.env.ACCESS_TOKEN}`,
});

////express
const app = express();
app.use(cors());
app.use(express.json());

app.get("/up", (req, res) => {
  return res.send("Server is running");
});


app.post("/api/payment", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          description: req.body.description,
          quantity: Number(req.body.quantity),
          currency_id: req.body.currency_id,
          unit_price: Number(req.body.unit_price),
        },
      ],
      back_urls: {
        success: "https://www.notion.so/",
        failure: "https://portafolio-v1-nub7.vercel.app/error404",
        pending: "https://portafolio-v1-nub7.vercel.app/",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({ id: result.id });
    //console.log(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(`${process.env.PORT}`, () => {
  console.log("Server is running on port ", `${process.env.PORT}`);
});
