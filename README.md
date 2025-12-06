\# API REST Final – Unidad 7: Nuevas Tecnologías



Este proyecto corresponde a la Actividad Complementaria 1 y 2 de la Unidad 7 de Nuevas Tecnologías.

El objetivo es desarrollar una API REST conectada a una base de datos PostgreSQL, documentarla con Postman

y desplegarla en un proveedor de la nube (Render.com). Además, se incluyen evidencias del funcionamiento

para la entrega académica.



---



\## Tecnologías utilizadas



\- Node.js  

\- Express.js  

\- PostgreSQL 17  

\- pg (node-postgres)  

\- Postman  

\- Render.com (despliegue)  

\- Git y GitHub (control de versiones)



---



\## Estructura del proyecto



api-rest-final/

&nbsp;├─ db/

&nbsp;│   ├─ database.backup        (Respaldo de la base de datos)

&nbsp;│   └─ plantilla.sql          (Script SQL proporcionado por el profesor)

&nbsp;├─ postman/

&nbsp;│   ├─ My Collection.postman\_collection.json

&nbsp;│   └─ api-rest-final-env.postman\_environment.json

&nbsp;├─ .gitignore

&nbsp;├─ index.js                   (Servidor Express principal)

&nbsp;├─ queries.js                 (Consultas SQL utilizadas por la API)

&nbsp;├─ package.json

&nbsp;├─ package-lock.json

&nbsp;└─ README.md



---



\## Endpoints desarrollados



GET /categorias  

Devuelve la lista de categorías.



POST /categorias  

Agrega una nueva categoría.



GET /productos  

Retorna todos los productos.



POST /productos  

Registra un nuevo producto.



(Se agregarán aquí los endpoints adicionales de la Actividad Complementaria 2.)



---



\## Instalación y ejecución local



Clonar el repositorio:



git clone https://github.com/ciberrick/api-rest-final.git

cd api-rest-final



Instalar las dependencias:



npm install



Ejecutar el servidor:



node index.js



El servidor corre por defecto en:

http://localhost:3000



---



\## Colección de Postman



La carpeta "postman" incluye:

\- La colección completa de endpoints.

\- El archivo de entorno utilizado para pruebas.



Ambos archivos pueden importarse directamente en Postman.



---



\## Base de datos



El proyecto incluye dos archivos importantes:



1\. plantilla.sql  

&nbsp;  Archivo SQL original proporcionado por el profesor.



2\. database.backup  

&nbsp;  Respaldo completo de la base de datos utilizado en PostgreSQL 17.



Estos archivos permiten recrear la base de datos del proyecto.



---



\## Despliegue en Render.com



El proyecto se desplegará como un Web Service en Render.com.



URL de la API desplegada: pendiente de publicar.



Una vez generado el enlace, será agregado en este apartado.



---



\## Autor



Ricardo Alcaraz (Usuario: ciberrick)  

GitHub: https://github.com/ciberrick



---



\## Licencia



Proyecto con fines exclusivamente académicos para la materia de Nuevas Tecnologías – Unidad 7.



