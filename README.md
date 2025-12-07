API REST Final – Node.js, Express, PostgreSQL y Render

Este proyecto implementa una API REST completa con operaciones CRUD para las entidades Productos, Clientes y Órdenes.
El desarrollo se realizó inicialmente en entorno local utilizando localhost para pruebas, pero la versión final fue desplegada como Web Service en Render para que el profesor pueda ingresar y probar la API públicamente.

URL pública de la API (versión final para evaluación)

https://api-rest-final-1.onrender.com

Esta es la URL que debe utilizarse para todas las pruebas.
El host local únicamente se utilizó durante la etapa de desarrollo.

Proceso de desarrollo
1. Desarrollo en entorno local

Durante la primera fase, la API se ejecutó en:

http://localhost:10000

En esta etapa se configuró lo siguiente:

Conexión local a PostgreSQL

Pruebas con Postman

Implementación y depuración de todos los CRUD

Configuración inicial de variables de entorno

Una vez confirmada la funcionalidad completa, el proyecto fue preparado para despliegue.

2. Despliegue como Web Service en Render (versión final)

Para que el profesor pueda acceder a la API sin ejecutar nada localmente, se realizó el despliegue en Render.
Este proceso incluyó:

Creación del servicio Web en Render

Creación de la base de datos PostgreSQL en Render

Configuración de variables de entorno en el panel de Render

Configuración obligatoria de SSL para la conexión

Limpieza de caché y redeploy para aplicar cambios

Exportación de colección y environment de Postman para pruebas online

Esta es la versión oficial del proyecto para revisión.

Estructura del proyecto

api-rest-final/
│── db/ (scripts SQL y datos de ejemplo)
│── node_modules/
│── postman/ (colección y environment exportados)
│── .env (variables locales)
│── index.js (servidor Express)
│── queries.js (consultas SQL y conexión a PostgreSQL)
│── package.json
│── package-lock.json
│── README.md

Pruebas con Postman

En la carpeta "postman/" se incluyen los siguientes archivos:

api-rest-final-collection-render.json
Colección completa con todas las rutas CRUD listas para pruebas.

api-rest-final-env-render.json
Environment que contiene la variable:

base_url = https://api-rest-final-1.onrender.com

Con esta variable, todas las rutas pueden probarse así:

{{base_url}}/clientes
{{base_url}}/productos
{{base_url}}/ordenes

Endpoints principales
Clientes

GET /clientes
GET /clientes/:id
POST /clientes
PUT /clientes/:id
DELETE /clientes/:id

Productos

GET /productos
GET /productos/:id
POST /productos
PUT /productos/:id
DELETE /productos/:id

Nota: Si un producto está asociado a órdenes registradas, no puede eliminarse debido a las restricciones de claves foráneas de PostgreSQL.

Órdenes

GET /ordenes
GET /ordenes/:id
POST /ordenes
PUT /ordenes/:id
DELETE /ordenes/:id

Modelo de base de datos (PostgreSQL)

Tabla: clientes
id SERIAL PRIMARY KEY
nombre TEXT
apellido_paterno TEXT
apellido_materno TEXT
rfc TEXT

Tabla: productos
id_producto SERIAL PRIMARY KEY
nombre TEXT
descripcion TEXT
precio NUMERIC
stock INT
id_categoria INT

Tabla: ordenes
id SERIAL PRIMARY KEY
cliente_id INT REFERENCES clientes(id)
producto_id INT REFERENCES productos(id_producto)
cantidad INT
fecha TIMESTAMP

Notas importantes

La API en Render puede tardar entre 20 y 40 segundos en responder cuando se encuentra inactiva (cold start).

Las pruebas deben realizarse utilizando la variable {{base_url}} del environment de Render.

El repositorio incluye tanto la versión local como la versión desplegada.

Autor

Richard Sánchez Alcaraz
Proyecto final – Bases de Datos