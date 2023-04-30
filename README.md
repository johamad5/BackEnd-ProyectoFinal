# PROYECTO FINAL  - CURSO DE PROGRAMACIÓN BACKEND   [ CODERHOUSE ]
## 👩‍💻 Profesor - [Marcos Villanueva](https://github.com/marcosvillanueva9)
## 👩‍💻 Tutor - [Gonzalo Satina Naggi](https://github.com/GonzaloSatina)
<br>

🔰    En este repositorio encontrarán el proyecto final correspondiente al curso de Programación Backend de CoderHouse. El mismo corresponde al desarrollo backend de un pequeño e-commerce.

<br>

### 💻 [LINK AL PROYECTO EN RAILWAY](https://backend-proyectofinal-production-896d.up.railway.app/)
### 📑 [DOCUMENTACIÓN CON SWAGGER](https://backend-proyectofinal-production-896d.up.railway.app/api/docs/)
<br>

# Ejecutar el proyecto local

Cloná el repo

```bash
  git clone https://github.com/johamad5/Backend-ProyectoFinal.git
```

Ve al directorio del proyecto

```bash
  cd Backend-ProyectoFinal/
```

Instala las dependencias necesarias

```bash
  npm install
```

Inicia el servidor

```bash
  npm run start
```
<br>

# MÉTODOS
## Login  
| Metodo   | Ruta                          | Descripción                                                    |
| :---      |     :---                     | :---                                                         	|
| GET       | /logout 		                 | Cierra la sesión activa.                                       |
| GET       | /loginError                  | Error que se devuelve al intentar realizar el login con una combinación de credenciales incorrecta.  |
| POST      | /login                       | Permite iniciar sesión con un usuario previamente registrado.  |
<br>

## Signup
| Metodo   | Ruta                          | Descripción                                                               |
| :---      |     :---                     | :---                                                                     	|
| GET       | /signupError 		             | Error que se devuelve cuando no se puede realizar el registro del usuario en el sistema de forma exitosa.                             |  
| POST      | /signup                      | Permite registrar un nuevo usuario en el sistema { adminCode: TatoEl1 }.  |
<br>

## Home
| Metodo   | Ruta                       | Descripción                                                    |
| :---      |     :---                     | :---                                                         	|
| GET       | /                            | **Auth req.** Devuelve la vista principal del sistema renderizada con el motor de plantillas EJS y donde se encuentra el chat con Socket.IO.  |  
<br>

## Users
| Metodo | Ruta    | Descripción |
| :---    |     :---     | :---                                                                		        	|
| GET     | /users/all   | **Admin Auth req.** Devuelve todos los usuarios de la base de datos.	|
| GET     | /users/:id   | **Admin Auth req.** Devuelve un usuario según el ID especificado.    |
<br>

## Products
| Metodo| Ruta    | Descripción             |
| :---    |     :---                            | :---                                                                		        	|
| GET     | /prods/                    |**Auth req.** Devuelve todos los productos que se encuentran en la base de datos. 	|
| GET     | /prods/:id  		           | **Admin Auth req.** Devuelve un producto según el ID especificado.|
| GET     | /prods/:minPrice/:maxPrice |**Auth req.** Devuelve todos los productos que se encuentran en la base de datos según el filtro de precios especificado. 	|
| PATCH   | /prods/:id                 | **Admin Auth req.** Actualiza un producto según el ID especificado. 	|
| POST    | /prods/                    | **Admin Auth req.** Agrega un nuevo producto.                         |
| DELETE  | /prods/:id 		             | **Admin Auth req.** Elimina un producto según el ID especificado.     |
| DELETE  | /prods/                    | **Admin Auth req.** Elimina todos los productos que se encuentran en la base de datos. |
<br>

## Carts
| Metodo | Ruta    | Descripción     |
| :---    |     :---                 | :---                                                                		        	|
| GET     | /carts/                  | **Admin Auth req.** Devuelve todos los carritos de la base de datos.		        	|
<<<<<<< HEAD
| GET     | /carts/myCart            | **Auth req.** Devuelve el detalle del carrito perteneciente la sesión activa.    |
| GET     | /carts/checkout 	       | **Auth req.** Confirma un pedido con todos los productos que contiene el carrito de la sesión activa.       |
| PATCH   | /carts/:productId/:units | **Auth req.** Agrega al carrito de la sesión el producto especificado con las unidades especificadas.	|
=======
| GET     | /carts/myCart            | **Auth req.** Devuelve el detalle del carrito perteneciente la sesión activa.|
| GET     | /carts/checkout 	       | **Auth req.** Confirma un pedido con todos los productos que contiene el carrito de la sesión activa.       |
| PATCH   | /carts/:productId/:units  | **Auth req.** Agrega al carrito de la sesión el producto especificado con las unidades especificadas.	|
>>>>>>> c515aeb157750570418c2d4d46562ab00e6c9d9b
| DELETE  | /carts/deleteCart        | **Auth req.** Vacía el carrito perteneciente la sesión activa. |
| DELETE  | /carts/:productId        | **Auth req.** Elimina el producto según el ID especificado del carrito de la sesión activa. |


<br>
<br>

# 🛠 SE UTILIZÓ
## 🔰 [express              4.18.2](https://www.npmjs.com/package/express)
## 🔰 [express-session      1.17.3](https://www.npmjs.com/package/express-session)
## 🔰 [swagger-ui-express   4.6.2](https://www.npmjs.com/package/swagger-ui-express)
## 🔰 [swagger-jsdoc        6.2.8](https://www.npmjs.com/package/swagger-jsdoc)
## 🔰 [socket.io            4.5.4](https://www.npmjs.com/package/socket.io)
## 🔰 [passport             0.6.0](https://www.npmjs.com/package/passport)
## 🔰 [passport-local       1.0.0](https://www.npmjs.com/package/passport-local)
## 🔰 [bcrypt               5.1.0](https://www.npmjs.com/package/bcrypt)
## 🔰 [mongoose             5.2.8](https://www.npmjs.com/package/mongoose)
## 🔰 [connect-mongo        4.6.0](https://www.npmjs.com/package/connect-mongo)
## 🔰 [ejs                  3.1.8](https://www.npmjs.com/package/ejs)
## 🔰 [cookie-parser        1.4.6](https://www.npmjs.com/package/cookie-parser)
## 🔰 [cors                 2.8.5](https://www.npmjs.com/package/cors)
## 🔰 [dotenv               16.0.3](https://www.npmjs.com/package/dotenv)
## 🔰 [nodemon              2.0.20](https://www.npmjs.com/package/nodemon)
## 🔰 [minimist             1.2.7](https://www.npmjs.com/package/minimist)
## 🔰 [twilio               4.10.0](https://www.npmjs.com/package/twilio)
## 🔰 [nodemailer           6.9.1](https://www.npmjs.com/package/nodemailer)
## 🔰 [winston              3.8.2](https://www.npmjs.com/package/winston)

<br>
<br>

# 💬 Sobre mi 

Luego de 5 años incursionando por el mundo de la medicina y realizar varios cursos de forma autodidacta relacionados con la informática y las tecnologías, decidí dar el gran salto hacia una de las áreas que más me apasiona y en su momento más miedo me dio, la programación.

Actualmente, me encuentro culminando el módulo de Programación Backend y trabajando en una empresa asociada a la venta de Certificados Digitales, muy feliz de mi elección. 


Si quieres conocer más de mí en el ámbito profesional me puedes encontrar en:

  [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/johana-madero-porley/)
