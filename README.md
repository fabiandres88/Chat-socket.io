# Chat-socket.io

La siguiente aplicación simulará un entorno de clase virtual donde un estudiante debidamente registrado y autenticado ingresara a su clase en video y ademas podra interactuar con sus compañeros de clase y el moderador de la misma mediante chat


## Aplicaciones a utilizar

- Visual Studio Code o editor de código a gusto.

> https://code.visualstudio.com/download

- NodeJS.

> https://nodejs.org/en/download/

- MongoDb compass.

> https://www.mongodb.com/try/download/compass


Paso siguiente se descarga/clona el repositorio Git Hub en el siguiente link:

> fabiandres88/https://github.com/fabiandres88/Chat-socket.io

Después de descargado se abre la carpeta del proyecto en el editor de código y se abre la terminal ubicándose en la ruta server, estando alli se ejecuta el siguiente comando en la consola:

> $ npm install

De esta manera npm instalará todos los paquetes necesarios para ejecutar el proyecto de NodeJS.

Ahora abrimos otra terminal y nos dirigimos a la ruta client y ejecutamos el siguiente comando:

> $ npm install

Ahora todos los paquetes para el proyecto AngularJS también se instalarán.

Paso seguido en la terminal de la ruta server vamos a ejecutar el siguiente comando:

> $ npm start


Se visualizará por consola lo siguiente:


```
> server@1.0.0 start
> nodemon index.js

[nodemon] 2.0.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server on port 3000
Connection successful to database
```

De esta manera se levantará el servidor de NodeJs y se establecerá la conexión con la base de datos vía el ODM Mongoose.

Ahora nuevamente en la ruta client vamos a ejecutar el siguiente comando:

> $ npm start

Se visualizará por consola lo siguiente:


```
> client@0.0.0 start
> ng serve

Compiling @angular/core : es2015 as esm2015
Compiling @angular/common : es2015 as esm2015
Compiling @angular/platform-browser : es2015 as esm2015
Compiling @angular/common/http : es2015 as esm2015
Compiling @angular/platform-browser-dynamic : es2015 as esm2015
Compiling @angular/router : es2015 as esm2015
Compiling @angular/forms : es2015 as esm2015
- Generating browser application bundles...[HPM] Proxy created: /api  ->  http://localhost:3000
[HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
√ Browser application bundle generation complete.

Initial Chunk Files   | Names         |      Size
vendor.js             | vendor        |   3.15 MB
polyfills.js          | polyfills     | 481.20 kB
styles.css, styles.js | styles        | 340.77 kB
main.js               | main          |  71.33 kB
runtime.js            | runtime       |   6.15 kB

                      | Initial Total |   4.02 MB

Build at: 2020-12-09T03:43:57.778Z - Hash: 2fa2e7a741f4ae577179 - Time: 23024ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **

√ Compiled successfully.
√ Browser application bundle generation complete.

Initial Chunk Files   | Names  |      Size
styles.css, styles.js | styles | 340.77 kB

4 unchanged chunks

Build at: 2020-12-09T03:44:03.963Z - Hash: be695074776e2a09496f - Time: 5691ms

√ Compiled successfully.
```


De esta manera se levantara el servidor de AngularJS y estará ejecutándose.

 Ahora es hora de ir al browser y ir al siguiente link:

> http://localhost:4200 


Se renderiza el componente login con los siguientes campos:

```
Academy login
Username

Password

Login
Register
```

Si el usuario está registrado se loguea, de lo contrario deberá hacer el registro llenando los siguientes campos en el componente register:

```
Register to Academy
Name

Username

Password

Register
```


Después de hacer el login se renderiza el componente home donde se visualiza el video embebido sobre el left margin y el chat sobre el right margin, en cual podrán interactuar en tiempo real los asistentes a la clase.

## Paquetes NodeJs utilizados

- express

- mongoose

- socket.io

- jsonwebtoken

- bcryptjs

- body-parser

- dotenv

- http

- cors

- http-status-codes

- nodemon (unicamente como dependencia de desarrollo)


## SUMARIO

Se hizo la importacion del CDN de Boostrap para el manejo del layout en el UI usando las clases que este nos provee permitiendo un layout responsive, tambien se recurrio a los metodos que provee el paquete del socket.io para el manejo de la comunicacion cliente servidor en tiempo real, aplicado al chat en vivo de la clase.

Se opto por el uso de una base de datos no relacional como MongoDb con su interfaz para el almacenamiento local como MongoDb Compass manejada a traves del ODM mongoose y los metodos que provee, de esta manera se logro un desarrollo full Stack con su Front-End desarrolado con Angular JS (componentes,servicios) y su Back-end con NodeJS (modulos npm).