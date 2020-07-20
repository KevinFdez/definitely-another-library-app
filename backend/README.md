# library-backend
Esta carpeta contiene el proyecto `library-backend`, el cual gestiona los recursos de la solución.
Atiende peticiones RESTful de los clientes para servir, o modificar, los datos de una DB emulada.
Se utiliza Node con el framework de IBM Loopback versión 4.

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

<br>

## Recursos del backend
El backend utiliza una serie de variables de sistema para establecer configuraciones de funcionamiento.
Estas variables tienen establecido por defecto un valor para su uso en modo desarrollo en caso de no establecer ningún valor.
Las variables son accesibles en todo el código con la constante `process.env.XXX`, donde `XXX` es la clave de la constante que se busca.

A continuación se detalle en la tabla las constantes definidas en esta App y como deben ser configuradas para un funcionamiento óptimo.

| CONSTANTE | TIPO VALOR | DEFINICIÓN |
| :-------- | :--------- | :--------- |
| PORT | Number | Puerto de acceso de la App |
| HOST | String | Dirección de la máquina HOST donde se instancia esta App |
| PROTOCOL | HTTP / HTTPS | Protocolo de seguridad utilizado |
| DISABLE_EXPLORER | Boolean | Define si debe des-habilitarse el modo explorador de la capa REST. En producción debe des-habilitarse. |
| NODE_ENV | development / production | Constante global que define el entorno en el que se encuentra corriendo |

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

