import { Router } from "express";
import {
  getArticulos,
  getArticulo,
  createArticulos,
  updateArticulos,
  deleteArticulos,
} from "../controllers/articulos.controllers.js";

const router = Router();

router.get("/articulos", getArticulos);
router.get("/articulo/:id", getArticulo);
router.post("/articulos", createArticulos);
router.patch("/articulos/:id", updateArticulos);
router.delete("/articulos/:id", deleteArticulos);

export default router;
