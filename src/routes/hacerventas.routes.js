import { Router } from "express";
import {
  hacerVenta,
  getVentasHechas,
  updateVenta,
  deleteVenta,
  getIdVentas,
  getIngresos,
  getCantidadVenta,
} from "../controllers/hacerventas.controllers.js";

const router = Router();

router.post("/ventas", hacerVenta);
router.get("/ventas", getVentasHechas);
router.get("/cantidadIngresos", getIngresos);
router.get("/cantidadVentas", getCantidadVenta);
router.get("/ventasId", getIdVentas);
router.patch("/ventas/:id", updateVenta);
router.delete("/ventas/:id", deleteVenta);

export default router;
