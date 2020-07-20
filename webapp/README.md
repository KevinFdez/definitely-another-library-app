# Webapp
Esta carpeta contiene el proyecto `library-frontend`, el cual expone una interfaz de acceso a los recursos que ofrece la API del backend.

[![Angular](https://angular.io/assets/images/logos/angular/logo-nav@2x.png)](https://angular.io)

<br>

## Despliegue
Para desplegar en local utilizar el siguiente comando:
> $ npm start

Si se desea la configuración en inglés, utilizar el siguiente comando:
> $ npm run start-english

Esto levanta el webapp y lo hace visible en la ubicación `http://localhost:4200/`.

<br>

## Estructura de proyecto
Se ha definido una estructura modular basada en la manera de organizar propia de Angular con algunos cambios.
- Dentro de la carpeta ‘src’ se ha generado una carpeta específica llamada ‘styles’ para contenidos generales de CSS como temáticas, estilos compartidos, declaración de fuentes, iconografías, etc..
- En este mismo punto también se encuentra la carpeta ‘locale’, la cual contiene elementos de internacionalización.
- Al bajar un escalón, dentro de la carpeta ‘app’, se ha dividido la estructura que conforma la aplicación en tres carpetas:
  - <i>Core</i>; esta carpeta contiene servicios singleton, componentes universales y otras características, como componentes, que se instancian una sola vez por aplicación.
  - <i>Modules</i>; esta carpeta contiene todas las páginas y componentes que conforman dichas páginas a lo largo de la aplicación. Se define de modo que permita escalar y separa la lógica de componentes de las propias páginas. Cada subcarpeta es una página o sección de la aplicación y, a su vez, esa subcarpeta divide la propia página de los componentes que la conforman, servicios exclusivos de la página o demás tipos de objetos.
  - <i>Shared</i>; esta carpeta contiene todos los componentes, tuberías o filtros y servicios compartidos. Este módulo no debería de depender de ningún otro módulo.

Entre otros, las mejoras que incluye este tipo de organización son: lazy loading eficiente, páginas y/o componentes totalmente modulares, permite tipos de desarrollo a futuro (future flags) al encapsular lógica, se puede exportar fácilmente módulos de lógica funcional a otras aplicaciones, etc...

