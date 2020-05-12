const path = require('path');//
const fs = require('fs');//

const beAbsolutePath = (route) => path.isAbsolute(route);
// función para saber si ruta es absoluta

const transIntoAbsolute = (route) => path.resolve(route);
// función para transformar ruta relativa a absoluta

const isDirectory = (route) => fs.lstatSync(route).isDirectory();
// console.log(beDirectory('../pruebas/pruebaDeDIrectorio'));

const isFile = (route) => fs.statSync(route).isFile();

const typeOfExtension = (route) => path.extname(route);
// Función para identificar que tipo de archivo es la ruta

const arrayIntoDirectory = (route) => {
  const readDirec = fs.readdirSync(route);// Lee el directorio
  return readDirec.map((file) => // con ayuda de map el directorio entra en un array
    path.join(route, file), // se crea file, path con el metodo join llama aruta y a file.
  )// Al final retorna la ruta de todo los archivos y directorios. PERO NO ENTRA EN CADA DIRECTORIO
};

console.log(arrayIntoDirectory('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS'));

const mdFiles = (route) => {
  let mdArray = []; // vamos a ir agregando componentes al array con ayuda de push
  if (isFile(route)) { //si path es archivo
    if (typeOfExtension(route) === '.md') { // y es md, agregar el archivo al mdArray
      mdArray.push(route);
    }
  } else { // si no ...
    arrayIntoDirectory(route).forEach((file) => { //llamar a arrayIntoDirectory, para que entre dentro del nuevo directorio.
      const fileRoute = file;
      const completeRoute = mdFiles(fileRoute);
      mdArray = mdArray.concat(completeRoute);
    });
  }
  return mdArray;
};

console.log(mdFiles('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas'));


module.exports = {
  beAbsolutePath, transIntoAbsolute, isDirectory, typeOfExtension, isFile,
};
