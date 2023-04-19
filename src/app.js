import express from "express";
import cors from "cors";
import articulosRoutes from "./routes/articulos.routes.js";
import imagesRoutes from "./routes/images.routes.js";
import createClientes from "./routes/clientes.routes.js";
import "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", articulosRoutes);
app.use(imagesRoutes);
app.use(createClientes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "No existe esa direccion de Api",
  });
});

export default app;
