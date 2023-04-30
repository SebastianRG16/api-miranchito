import { Router } from "express";
import {
  getArticulos,
  getArticulo,
  updateArticulos,
  deleteArticulos,
  uploadd,
  getCantidad,
} from "../controllers/articulos.controllers.js";

const router = Router();

router.get("/articulos", getArticulos);
router.get("/cantidadArticulo", getCantidad);
router.get("/articulo/:id", getArticulo);
router.patch("/articulos/:id", uploadd, updateArticulos);
router.delete("/articulos/:id", deleteArticulos);

export default router;
