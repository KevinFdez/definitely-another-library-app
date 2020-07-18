# library-backend
Esta carpeta contiene el proyecto `library-backend`, el cual gestiona los recursos de la solución.
Atiende peticiones RESTful de los clientes para servir, o modificar, los datos de una DB emulada.
Se utiliza Node con el framework de IBM Loopback versión 4.

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

<br>

## Despliegue
#### Desplegar en consola
Desplegar el proyecto en local ejecutando desde el directorio raiz del proyecto el siguiente comando:
> $ npm start

<br>

#### Desplegar en docker
Desplegar el proyecto en un contenedor Docker local ejecutando desde el directorio raiz el siguiente comando:
> $ docker run -p 3000:3000 .

<br>

## Explorar la API
#### Información técnica de la API
Se exponen los recursos de la OpenAPI en la siguiente ubicación:
> http://localhost:3000/openapi.json

Esto muestra información técnica sobre la API expuesta (REST) conforme al estándar openAPI.


#### Acceso a recursos con Swagger
Se exponen el acceso a la API con REST mediante la utilidad de Swagger en la siguiente ubicación:
> http://localhost:3000/explorer/

Esto permite interactuar o realizar peticiones a la API mediante esta utilidad gráfica.

