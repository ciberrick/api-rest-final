const { Pool } = require('pg');

// 🔧 CONFIGURA AQUÍ TU CONEXIÓN A POSTGRES
const pool = new Pool({
  user: 'postgres',        // tu usuario de PostgreSQL
  host: 'localhost',       // host
  database: 'postgres',    // BD donde creaste tablas
  password: '12345',       // tu contraseña
  port: 5432,              // puerto por defecto
});

//
// ---------- PRODUCTOS ----------
//  Tabla: productos
//  Campos: id_producto, nombre, descripcion, precio, stock, id_categoria
//

// GET /productos
const getProductos = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id_producto, nombre, descripcion, precio, stock, id_categoria FROM productos ORDER BY id_producto'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error en getProductos:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// GET /productos/:id
const getProductoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      'SELECT id_producto, nombre, descripcion, precio, stock, id_categoria FROM productos WHERE id_producto = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error en getProductoById:', err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// POST /productos
const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, id_categoria } = req.body;
    const result = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_producto, nombre, descripcion, precio, stock, id_categoria`,
      [nombre, descripcion, precio, stock, id_categoria]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en createProducto:', err);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// PUT /productos/:id
const updateProducto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, precio, stock, id_categoria } = req.body;

    const result = await pool.query(
      `UPDATE productos
       SET nombre = $1,
           descripcion = $2,
           precio = $3,
           stock = $4,
           id_categoria = $5
       WHERE id_producto = $6
       RETURNING id_producto, nombre, descripcion, precio, stock, id_categoria`,
      [nombre, descripcion, precio, stock, id_categoria, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateProducto:', err);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// DELETE /productos/:id
const deleteProducto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      'DELETE FROM productos WHERE id_producto = $1 RETURNING id_producto',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error('Error en deleteProducto:', err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};


//
// ---------- CLIENTES ----------
//  Tabla: clientes
//  Campos: id, nombre, apellido_paterno, apellido_materno, rfc
//

// GET /clientes
const getClientes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id,
              nombre,
              apellido_paterno,
              apellido_materno,
              rfc
       FROM clientes
       ORDER BY id`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error en getClientes:', err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// GET /clientes/:id
const getClienteById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      `SELECT id,
              nombre,
              apellido_paterno,
              apellido_materno,
              rfc
       FROM clientes
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error en getClienteById:', err);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

// POST /clientes
const createCliente = async (req, res) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, rfc } = req.body;

    const result = await pool.query(
      `INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, rfc)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, apellido_paterno, apellido_materno, rfc`,
      [nombre, apellido_paterno, apellido_materno, rfc]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en createCliente:', err);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// PUT /clientes/:id
const updateCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, apellido_paterno, apellido_materno, rfc } = req.body;

    const result = await pool.query(
      `UPDATE clientes
       SET nombre = $1,
           apellido_paterno = $2,
           apellido_materno = $3,
           rfc = $4
       WHERE id = $5
       RETURNING id, nombre, apellido_paterno, apellido_materno, rfc`,
      [nombre, apellido_paterno, apellido_materno, rfc, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado para actualizar' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateCliente:', err);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// DELETE /clientes/:id
const deleteCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      'DELETE FROM clientes WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado para eliminar' });
    }

    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (err) {
    console.error('Error en deleteCliente:', err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};


//
// ---------- ORDENES ----------
//  Tabla: ordenes
//  Campos: id, cliente_id, producto_id, cantidad, fecha
//

// GET /ordenes
const getOrdenes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
          o.id,
          o.cliente_id,
          c.nombre       AS nombre_cliente,
          o.producto_id,
          p.nombre       AS nombre_producto,
          o.cantidad,
          o.fecha
       FROM ordenes o
       LEFT JOIN clientes  c ON c.id = o.cliente_id
       LEFT JOIN productos p ON p.id_producto = o.producto_id
       ORDER BY o.id`
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error en getOrdenes:', err);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

// GET /ordenes/:id
const getOrdenById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      `SELECT 
          o.id,
          o.cliente_id,
          c.nombre       AS nombre_cliente,
          o.producto_id,
          p.nombre       AS nombre_producto,
          o.cantidad,
          o.fecha
       FROM ordenes o
       LEFT JOIN clientes  c ON c.id = o.cliente_id
       LEFT JOIN productos p ON p.id_producto = o.producto_id
       WHERE o.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error en getOrdenById:', err);
    res.status(500).json({ error: 'Error al obtener orden' });
  }
};

// POST /ordenes
const createOrden = async (req, res) => {
  try {
    const { cliente_id, producto_id, cantidad, fecha } = req.body;

    const result = await pool.query(
      `INSERT INTO ordenes (cliente_id, producto_id, cantidad, fecha)
       VALUES ($1, $2, $3, $4)
       RETURNING id, cliente_id, producto_id, cantidad, fecha`,
      [cliente_id, producto_id, cantidad, fecha]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en createOrden:', err);
    res.status(500).json({ error: 'Error al crear orden' });
  }
};

// PUT /ordenes/:id
const updateOrden = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { cliente_id, producto_id, cantidad, fecha } = req.body;

    const result = await pool.query(
      `UPDATE ordenes
       SET cliente_id = $1,
           producto_id = $2,
           cantidad   = $3,
           fecha      = $4
       WHERE id = $5
       RETURNING id, cliente_id, producto_id, cantidad, fecha`,
      [cliente_id, producto_id, cantidad, fecha, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Orden no encontrada para actualizar' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateOrden:', err);
    res.status(500).json({ error: 'Error al actualizar orden' });
  }
};

// DELETE /ordenes/:id
const deleteOrden = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      'DELETE FROM ordenes WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Orden no encontrada para eliminar' });
    }

    res.status(200).json({ message: 'Orden eliminada' });
  } catch (err) {
    console.error('Error en deleteOrden:', err);
    res.status(500).json({ error: 'Error al eliminar orden' });
  }
};

//
// EXPORTAR TODO
//
module.exports = {
  // productos
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,

  // clientes
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,

  // ordenes
  getOrdenes,
  getOrdenById,
  createOrden,
  updateOrden,
  deleteOrden,
};
