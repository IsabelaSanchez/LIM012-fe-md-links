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

const getArrayOfFilesAndDirectories = (route) => {
  const readDirectory = fs.readdirSync(route);// Lee el directorio
  return readDirectory.map((file) => // con ayuda de map el directorio entra en un array
    path.join(route, file), // se crea file, path con el metodo join llama aruta y a file.
  ) // Al final retorna la ruta de todo los archivos y directorios. PERO NO ENTRA EN CADA DIRECTORIO
};
console.log('this getArrayOfFilesAndDirectories function test :')
console.log(getArrayOfFilesAndDirectories('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS'));

const getMdFiles = (route) => {
  let arrayOfMdFiles = []; // vamos a ir agregando componentes al array con ayuda de push
  if (isFile(route)) { //si path es archivo
    if (typeOfExtension(route) === '.md') { // y es md, agregar el archivo al arrayOfMdFiles
      arrayOfMdFiles.push(route);
    }
  } else { // si no ...
    getArrayOfFilesAndDirectories(route).forEach((file) => { //llamar a getArrayOfFilesAndDirectories, para que entre dentro del nuevo directorio.
      const filesOfNewRoute = file;// como la función for each siempre llama a un element donde guarda la lista, nosotros lo llamamos file, guardamos los files del nuevo directorio en const files of new route
      const getMDFilesInNewRoute = getMdFiles(filesOfNewRoute);//le pasamos la funcion getMdFiles a los files de la nueva ruta, para que haga la busqueda de archivos MD of vuelva a entrar a un nuevo diretcorio.
      arrayOfMdFiles = arrayOfMdFiles.concat(getMDFilesInNewRoute);//concatenamos los files md de la nueva ruta con el array de files total
    });
  }
  return arrayOfMdFiles;
};
console.log('This getMdFiles function testing :' );
console.log(getMdFiles('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas'));

//como ya guaradmos el archivo md en un array, ahora hay que leerlo

const readingFiles = (route) => fs.readFileSync(route).toString();
console.log('This is readingFiles function testing :' );
console.log(readingFiles('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas\\PRUEBA1.md'));

const isAValidPath = (route) => fs.existsSync(route)
// console.log(isAValidPath('../pruebas/pruebaDeDIrectorio'));

const searchLinks = (route) => {
      let arrayOfMdLinks = [];
      const renderer = new marked.Renderer();
      getMdFiles(route).forEach((file) => {
        // render.link = function (href, title, text)
        renderer.link = (href, title, text) => {
          const linkInfo = {
            href,
            text,
            file
          };
          arrayOfMdLinks.push(linkInfo);
        };
        marked(readingFiles(file), { renderer });
      });
      return arrayOfMdLinks; 
    };
    console.log('Aquí va la prueba del markeddd: ')
    console.log(searchLinks('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas\\PRUEBA1.md'));

const getLinksfromAValidPath = (route) => {
  if (!isAValidPath(route)) {
    throw Error
  } else {
    if (!beAbsolutePath(route)) {
      const makeThisRouteAbsolute = transIntoAbsolute(route);
      const proofSearchLinks = searchLinks(makeThisRouteAbsolute);
      return proofSearchLinks
      }else{
        const absoluteLinks = searchLinks(route);
        return absoluteLinks
      }
    }
};    
console.log('holi');
console.log(getLinksfromAValidPath('../pruebas/PRUEBA1.md'));
console.log(getLinksfromAValidPath('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\PRUEBA2.md'))

const validateOption = (route) => {
  let newLinksInfo = [];
  const usersRoute = getLinksfromAValidPath(route);
  if (usersRoute.length === 0) {
    return 'No hay links'
  } else {
    usersRoute.forEach((element) => {
      newLinksInfo.push(fetch(element.href)
      .then((res) => {
        const newElement = {
          href: element.href,
          text: element.text.substring(0, 50),
          file: element.file,          
          status: res.status,
          statusText: res.statusText
        };
        return newElement;
      })
      .catch(error => console.error(error)));
    });
  }
  return Promise.all(newLinksInfo).then(val => console.log(val));
};

console.log('que fue : ');
console.log(validateOption('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-fe-md-links\\pruebas'));

module.exports = {
  beAbsolutePath, transIntoAbsolute, isDirectory, typeOfExtension, isFile,
};
