import { pool } from "../db.js";

export const createCliente = async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const identificacion = req.body.identificacion;
    const ciudad = req.body.ciudad;
    const contacto = req.body.telefono;
    const email = req.body.correo;
    const estado = req.body.estado;
    const [rows] = await pool.query(
      "INSERT INTO clientes (nombre,identificacion,ciudad,contacto,email,estado) VALUES (?,?,?,?,?,?)",
      [nombre, identificacion, ciudad, contacto, email, estado]
    );
    res.send({
      id: rows.insertId,
      nombre,
      identificacion,
      ciudad,
      contacto,
      email,
      estado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const updateCliente = async (req, res) => {
  try {
    console.log(req.body);
    const nombre = req.body.nombre;
    const identificacion = req.body.identificacion;
    const ciudad = req.body.ciudad;
    const contacto = req.body.contacto;
    const email = req.body.email;
    const estado = req.body.estado;
    const [result] = await pool.query(
      "UPDATE clientes SET nombre= IFNULL(?, nombre), identificacion= IFNULL(?, identificacion), ciudad= IFNULL(?, ciudad), contacto= IFNULL(?, contacto), email= IFNULL(?, email), estado= IFNULL(?, estado) WHERE id_cliente=?",
      [nombre, identificacion, ciudad, contacto, email, estado, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    const [rows] = await pool.query(
      "SELECT * FROM clientes WHERE id_cliente = ?",
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM clientes WHERE id_cliente = ?",
      [req.params.id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "No se encontro ese cliente",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};
