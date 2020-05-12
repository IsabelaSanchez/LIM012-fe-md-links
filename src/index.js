const path = require('path');//
const fs = require('fs');//

const beAbsolutePath = (route) => path.isAbsolute(route);
// función para saber si ruta es absoluta

const transIntoAbsolute = (route) => path.resolve(route);
// función para transformar ruta relativa a absoluta

const isDirectory = (route) => fs.lstatSync(route).isDirectory();
// console.log(beDirectory('../pruebas/pruebaDeDIrectorio'));

const typeOfExtension = (route) => path.extname(route);
// Función para identificar que tipo de archivo es la ruta


// console.log(transIntoAbsolute('../pruebas/PRUEBA1.md'));
// console.log(beAbsolutePath('..\\PRUEBA2.md'));
// console.log(transIntoAbsolute('..\\PRUEBA2.md'));
// console.log(beAbsolutePath(transIntoAbsolute('..\\PRUEBA2.md')));

module.exports = {
  beAbsolutePath, transIntoAbsolute, isDirectory, typeOfExtension,
};
