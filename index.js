// index.js
const express = require('express');
const app = express();
const db = require('./queries');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API REST funcionando ✔', estado: 'ok' });
});

//
// ---------- RUTAS PRODUCTOS ----------
//
app.get('/productos', db.getProductos);
app.get('/productos/:id', db.getProductoById);
app.post('/productos', db.createProducto);
app.put('/productos/:id', db.updateProducto);
app.delete('/productos/:id', db.deleteProducto);

//
// ---------- RUTAS CLIENTES ----------
//
app.get('/clientes', db.getClientes);
app.get('/clientes/:id', db.getClienteById);
app.post('/clientes', db.createCliente);
app.put('/clientes/:id', db.updateCliente);
app.delete('/clientes/:id', db.deleteCliente);

//
// ---------- RUTAS ORDENES ----------
//
app.get('/ordenes', db.getOrdenes);
app.get('/ordenes/:id', db.getOrdenById);
app.post('/ordenes', db.createOrden);
app.put('/ordenes/:id', db.updateOrden);
app.delete('/ordenes/:id', db.deleteOrden);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
