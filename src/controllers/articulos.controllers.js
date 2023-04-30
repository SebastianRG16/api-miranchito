import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const sharp = require("sharp");

export const getArticulos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    for (let index = 0; index < rows.length; index++) {
      if (rows[index].nombre != null) {
        const img = path.join(
          __dirname + `/../../images/${rows[index].nombre}`
        );
        const convertirImg = fs.readFileSync(img);
        const anteproceso = sharp(convertirImg.buffer);
        const procesoImg = anteproceso.resize({ width: 250 });
        const finalImg = await procesoImg.toBuffer();
        const base64imgfinal = finalImg.toString("base64");
        rows[index].nombre = base64imgfinal;
      } else {
        console.log("sin imagen");
      }
    }
    res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const getCantidad = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) FROM productos");

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const getArticulo = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Producto no encontrado",
      });

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../images"),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const uploadd = upload.single("image");

export const updateArticulos = async (req, res) => {
  try {
    const name = req.body.name;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;
    const tipo = req.file.mimetype;
    const nombre = req.file.originalname;
    const [result] = await pool.query(
      "UPDATE productos SET name= IFNULL(?, name), precio= IFNULL(?, precio), cantidad= IFNULL(?, cantidad), tipo= IFNULL(?, tipo), nombre= IFNULL(?, nombre) WHERE id=?",
      [name, precio, cantidad, tipo, nombre, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const deleteArticulos = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "No se encontro ese producto",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};
