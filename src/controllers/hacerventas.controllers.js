import { pool } from "../db.js";

export const hacerVenta = async (req, res) => {
  try {
    console.log(req.body.id);
    console.log(req.body.fecha);
    console.log(req.body.id_producto);
    console.log(req.body.total);
    console.log(req.body.cantidad);
    console.log(req.body.nombrecliente);
    console.log(req.body.identificacion);
    const id_venta = req.body.id;
    const fecha = req.body.fecha;
    const id_producto = req.body.id_producto;
    const total = req.body.total;
    const cantidad = req.body.cantidad;
    const nombrecliente = req.body.nombrecliente;
    const identificacion = req.body.identificacion;
    const [rows] = await pool.query(
      "INSERT INTO hacerventas (fecha,id_producto,total,cantidad,nombrecliente,identificacion,id_venta) VALUES (?,?,?,?,?,?,?)",
      [
        fecha,
        id_producto,
        total,
        cantidad,
        nombrecliente,
        identificacion,
        id_venta,
      ]
    );
    res.send({
      id: rows.isenrtId,
      fecha,
      id_producto,
      total,
      cantidad,
      nombrecliente,
      identificacion,
      id_venta,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const getIngresos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT SUM(total) FROM hacerventas;");

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const getCantidadVenta = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(DISTINCT id_venta) FROM hacerventas"
    );

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const getVentasHechas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM hacerventas");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const getIdVentas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id_venta FROM hacerventas");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};

export const updateVenta = async (req, res) => {
  try {
    const fecha = req.body.fecha;
    const id_producto = req.body.id_producto;
    const total = req.body.total;
    const cantidad = req.body.cantidad;
    const nombrecliente = req.body.nombrecliente;
    const identificacion = req.body.identificacion;
    const [result] = await pool.query(
      "UPDATE hacerventas SET fecha= IFNULL(?, fecha), id_producto= IFNULL(?, id_producto), total= IFNULL(?, total), cantidad= IFNULL(?, cantidad), nombrecliente= IFNULL(?, nombrecliente), identificacion= IFNULL(?, identificacion) WHERE id_hacerventas=?",
      [
        fecha,
        id_producto,
        total,
        cantidad,
        nombrecliente,
        identificacion,
        req.params.id,
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "venta no encontrada",
      });
    }
    const [rows] = await pool.query(
      "SELECT * FROM hacerventas WHERE id_hacerventas = ?",
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

export const deleteVenta = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM hacerventas WHERE id_hacerventas = ?",
      [req.params.id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "No se encontro esa venta",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Problema interno del servidor",
    });
  }
};
