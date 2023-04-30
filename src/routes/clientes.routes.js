import { Router } from "express";
import {
  createCliente,
  getClientes,
  updateCliente,
  deleteCliente,
  getCantidad,
} from "../controllers/clientes.controllers.js";

const router = Router();

router.post("/clientes", createCliente);
router.get("/clientes", getClientes);
router.get("/clientesCantidad", getCantidad);
router.patch("/clientes/:id", updateCliente);
router.delete("/clientes/:id", deleteCliente);

export default router;
