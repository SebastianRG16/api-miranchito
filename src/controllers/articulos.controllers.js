import { pool } from "../db.js";

export const getArticulos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const getArticulo = async (req, res) => {
  try {
    // console.log(req.params.id);
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

export const createArticulos = async (req, res) => {
  try {
    const { name, precio } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO productos (name,precio) VALUES (?,?)",
      [name, precio]
    );
    res.send({
      id: rows.insertId,
      name,
      precio,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const updateArticulos = async (req, res) => {
  try {
    //   const { id } = req.params.id;
    const { name, precio } = req.body;
    const [result] = await pool.query(
      "UPDATE productos SET name= IFNULL(?, name), precio= IFNULL(?, precio) WHERE id=?",
      [name, precio, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Empleado no encontrado",
      });
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (error) {
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
        message: "No se encontro ese empleado",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};
