import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db.js";

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

export const createArticulos = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const name = req.body.name;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;
    const tipo = req.file.mimetype;
    const nombre = req.file.originalname;

    const [rows] = await pool.query(
      "INSERT INTO productos (name,precio,cantidad,tipo,nombre) VALUES (?,?,?,?,?)",
      [name, precio, cantidad, tipo, nombre]
    );
    res.send({
      id: rows.insertId,
      name,
      precio,
      cantidad,
      tipo,
      nombre,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};
