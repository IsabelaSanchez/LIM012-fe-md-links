const path = require('path');//
const fs = require('fs');//
const marked = require('marked');
const fetch = require ('node-fetch'); 
var markdownLinkExtractor = require('markdown-link-extractor');// al final no lo use :c, si hay tiempo ideare una forma de usarlo uwu


const beAbsolutePath = (route) => path.isAbsolute(route);
// función para saber si ruta es absoluta

const transIntoAbsolute = (route) => path.resolve(route);
// función para transformar ruta relativa a absoluta

const isDirectory = (route) => fs.lstatSync(route).isDirectory();
// console.log(isDirectory('../pruebas/pruebaDeDIrectorio'));

const isFile = (route) => fs.statSync(route).isFile();

const typeOfExtension = (route) => path.extname(route);
// Función para identificar que tipo de archivo es la ruta
const readingFiles = (route) => fs.readFileSync(route, 'utf-8');
// función sincróna para leer los files
// console.log(readingFiles('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas\\PRUEBA1.md'));
const readingDirectories = (route) => fs.readdirSync(route);
 // console.log(readingDirectories('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS')); 
 //devuelve array de elementos

const getArrayOfFilesAndDirectories = (route) => {
  return readingDirectories(route).map(element =>
    path.join(route, element),);
};
// console.log('Prueba de getArrayofFiles... : ');
// console.log(getArrayOfFilesAndDirectories('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS'));
// devuelve nuevo array de elementos + la ruta de cada archivo/directorio

const getMDFiles = (route) => {
  let arrayOfMDFiles = []; // vamos a ir agregando componentes al array con ayuda de push
  if (isFile(route)) { //si path es archivo
    if (typeOfExtension(route) === '.md') { // y es md, agregar el archivo al arrayOfMdFiles
      arrayOfMDFiles.push(route);
    }
  } else { // si no ...
    getArrayOfFilesAndDirectories(route).forEach((element) => { //llamar a getArrayOfFilesAndDirectories, para que entre dentro del nuevo directorio.
      const filesOfNewRoute = element;// como la función for each siempre llama a un element donde guarda la lista, nosotros lo llamamos file, guardamos los files del nuevo directorio en const files of new route
      const getMDFilesInNewRoute = getMDFiles(filesOfNewRoute);//le pasamos la funcion getMdFiles a los files de la nueva ruta, para que haga la busqueda de archivos MD of vuelva a entrar a un nuevo diretcorio.
      arrayOfMDFiles = arrayOfMDFiles.concat(getMDFilesInNewRoute);//concatenamos los files md de la nueva ruta con el array de files total
    });//al pasar de getMDFiles dentro de getMDFiles hacemos uso de la recursionnnnn!!!
  }
  return arrayOfMDFiles;
};
// console.log('Prueba de getMDFiles: ');
// console.log(getMDFiles('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas'))

//como ya guaradmos el archivo md en un array, ahora hay que leerlo

const getMDLinks = (route) => {
    if (!beAbsolutePath(route)) {
      const newTransAbsolutePath = transIntoAbsolute(route);
      let finalArrayOfMDLinks = [];
      const renderer = new marked.Renderer();
      getMDFiles(newTransAbsolutePath).forEach((file) => {
        renderer.link = (href, title, text) => {
          const linkInfo = {
            href,
            text,
            file
          };
          finalArrayOfMDLinks.push(linkInfo);
        };
        marked(readingFiles(file), { renderer });
      });
      return finalArrayOfMDLinks; 
    };
};
// console.log('Aquí va la prueba del marked(función getMDLinks) :')
// console.log(getMDLinks('../pruebas'));


const validateOption = (route) => {
  let newLinksInfo = [];
  const usersLinkArray = getMDLinks(route);
  if (usersLinkArray.length === 0) {
    return 'There are 0 links'
  } else {
    usersLinkArray.forEach((element) => {
      newLinksInfo.push(fetch(element.href)
      .then((res) => {
        const newElementInfo = {
          href: element.href,
          text: element.text.substring(0, 50),
          file: element.file,          
          status: res.status,
          statusText: res.statusText
        };
        return newElementInfo;
      }));
    });
  }
  return Promise.all(newLinksInfo);
};

// Si hay links + status <-Aquí devuelve un array
// console.log(validateOption('../pruebas')); 
// No hay links opción
// console.log(validateOption('../pruebas/pruebaDeDIrectorio'));

module.exports = {
  beAbsolutePath, 
  transIntoAbsolute, 
  isDirectory, 
  typeOfExtension, 
  isFile, 
  readingFiles,
  readingDirectories, 
  getArrayOfFilesAndDirectories,
  getMDFiles,
  getMDLinks, 
  validateOption
};
