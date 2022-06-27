# API-Properties
##PRIMEROS PASOS##

Ejecutar el comando npm install para instalar las dependecias del proyecto
#####################
Crear un archivo con el nombrer "variables.env" el cual debe contener las siguientes variables de entorno

MONGODB_URI="acá se debe asignar la conexion a la base de datos de mongoDB"
Audience=api
Issuer=http://localhost:9000
HOST=localhost
Key="acá asignamos la apiKey que nos genera SendGrid"
Correo="acá asignamos el correo que emitira el mensaje"

#####################
Ejecutar el comando npm run dev para ejecutar el proyecto en ambiente de desarrollo

#####################
Probar los endpoint solicitados en una aplicacion de test API como Postman

POST /api/register
POST /api/login

GET, POST, UPDATE, DELETE /api/properties ------------> cabe destacara que se debe enviar con la cabecera de autorización Bear Token con el token devuelto
Al momento de generar un POST/UPDATE se debe enviar el body en el formato form-data y las imagenes se deben agregar en la key "imagen"
El campo "cantidad_baños" se debe enviar como "cantidad_banios"

#####################
