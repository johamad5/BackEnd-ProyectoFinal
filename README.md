# PROYECTO FINAL  - CURSO DE PROGRAMACIÓN BACKEND   [ CODERHOUSE ]
## 👩‍💻 Profesor - [Marcos Villanueva](https://github.com/marcosvillanueva9)
## 👩‍💻 Tutor - [Gonzalo Satina Naggi](https://github.com/GonzaloSatina)
<br>

### 🔰    En este repositorio encontraran el proyecto final correspondiente al curso de Programación Backend de CoderHouse. El mismo corresponde al desarrollo backend de un pequeño e-commerce.

<br>

### 💻 [LINK AL PROYECTO EN RAILWAY](https://link_de_railway/)
### 📑 [DOCUMENTACIÓN CON SWAGGER](https://link_de_swagger/)
<br>

# MÉTODOS
## Login
| Metodo   | Ruta                       | Descripción                                                    |
| :---      |     :---                     | :---                                                         	|
| POST      | /login                       | Permite iniciar sesión con un usuario previamente registrado.  |
| GET       | /logout 		               | Devuelve un producto según su id.                              |
| GET       | /loginError                  | Error que se devuelve al intentar realizar el login con una combinación de credenciales incorrecta.  |
<br>

## Signup
| Metodo   | Ruta                       | Descripción                                                    |
| :---      |     :---                     | :---                                                         	|
| POST      | /signup                      | Permite registrar un nuevo usuario en el sistema { adminCode: TatoEl1 }.  |
| GET       | /signupError 		           | Error que se devuelve cuando no se puede realizar el registro del usuario en el sistema de forma exitosa.                             |  
<br>

## Home
| Metodo   | Ruta                       | Descripción                                                    |
| :---      |     :---                     | :---                                                         	|
| GET       | /                            | Devuelve la vista principal del sistema renderizada con el motor de plantillas EJS y donde se encuentra el chat con Socket.IO.  |  
<br>

## Users
| Metodo | Ruta    | Descripción             |
| :---    |     :---                            | :---                                                                		        	|
| GET     | /users/all                      | **Admin Auth req.** Devuelve todos los usuarios de la base de datos.	|
| GET     | /users/:id                     | **Admin Auth req.** Devuelve un usuario según el ID especificado.  |

<br>

## Products
| Metodo| Ruta    | Descripción             |
| :---    |     :---                            | :---                                                                		        	|
| GET     | /prods/                   |**Auth req.** Devuelve todos los productos que se encuentan en la base de datos. 	        	|
| GET     | /prods/:id  		            | **Admin Auth req.** Devuelve un producto según el ID especificado.|
| POST    | /prods/                    | **Admin Auth req.** Agrega un nuevo producto.  |
| PATCH     | /prods/:id                       | **Admin Auth req.** Actualiza un producto según el ID especificado. 	|
| DELETE     | /prods/:id 		            | **Admin Auth req.** Elimina un producto según el ID especificado. |
| DELETE    | /prods/                     | **Admin Auth req.** Elimina todos los productos que se encuentan en la base de datos. |


<br>

## Carts
| Metodo | Ruta    | Descripción             |
| :---    |     :---                            | :---                                                                		        	|
| GET     | /carts/                        | **Admin Auth req.** Devuelve todos los carritos de la base de datos.		        	|
| GET     | /carts/myCart            | **Auth req.** Devuelve el detalle del carrito perteneciente la sesión activa.|
| DELETE    | /carts/deleteCart                     | **Auth req.** Vacía el carrito perteneciente la sesión activa. |
| DELETE    | /carts/:productId                     | **Auth req.** Elimina el producto según el ID especificado del carrito de la sesión activa. |
| PATCH     | /carts/:producId/:units                      | **Auth req.** Agrega al carrito de la session el producto especificado con las unidades especificadas.	|
| GET     | /carts/checkout 	            | **Auth req.** Confirma un pedido con todos los productos que contiene el carrito de la sesión activa.       |


<br>
<br>

# 🛠 SE UTILIZÓ
## 🔰 [express 4.18.2](https://www.npmjs.com/package/express)

## 🔰 [express-session ^1.17.3](https://www.npmjs.com/package/express-session)
## 🔰 [swagger-ui-express 4.6.2](https://www.npmjs.com/package/swagger-ui-express)
## 🔰 [swagger-jsdoc 6.2.8](https://www.npmjs.com/package/swagger-jsdoc)
## 🔰 [socket.io 4.5.4](https://www.npmjs.com/package/socket.io)
## 🔰 [passport 0.6.0](https://www.npmjs.com/package/passport)
## 🔰 [passport-local 1.0.0](https://www.npmjs.com/package/passport-local)
## 🔰 [bcrypt 5.1.0](https://www.npmjs.com/package/bcrypt)
## 🔰 [mongoose 5.2.8](https://www.npmjs.com/package/mongoose)
## 🔰 [connect-mongo 4.6.0](https://www.npmjs.com/package/connect-mongo)
## 🔰 [ejs 3.1.8](https://www.npmjs.com/package/ejs)
## 🔰 [cookie-parser 1.4.6](https://www.npmjs.com/package/cookie-parser)
## 🔰 [cors 2.8.5](https://www.npmjs.com/package/cors)
## 🔰 [dotenv 16.0.3](https://www.npmjs.com/package/dotenv)
## 🔰 [nodemon 2.0.20](https://www.npmjs.com/package/nodemon)
## 🔰 [winston 3.8.2](https://www.npmjs.com/package/winston)
## 🔰 [minimist 1.2.7](https://www.npmjs.com/package/minimist)
## 🔰 [twilio 4.10.0](https://www.npmjs.com/package/twilio)
## 🔰 [nodemailer 6.9.1](https://www.npmjs.com/package/nodemailer)

<br>
<br>

# 💬 Sobre mi 

Luego de 5 años incursionando por en el mundo de la medicina y realizar varios cursos de forma autodidacta relacionados con la informática y las tecnologías, decidí dar el gran salto hacia una de las áreas que más me apasiona y en su momento más miedo me dió, la programación.

Actualmente me encuentro culminando el módulo de Progranación Backend y me encuentro trabajando en una empresa asociada a las tecnologías, muy feliz de mi elección. 


Si quieres conocer más de mí en el ámbito profesional me puedes encontrar en:

  [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/johana-madero-porley/)
