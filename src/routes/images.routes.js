import { Router } from "express";
import {
  uploadd,
  createArticulos,
} from "../controllers/cargaImages.controllers.js";

const router = Router();

router.post("/articulos", uploadd, createArticulos);

export default router;
