const path = require('path');

const beAbsolutePath = (route) => path.isAbsolute(route);

const transIntoAbsolute = (route) => path.resolve(route);
console.log(transIntoAbsolute('../pruebas/PRUEBA1.md'));
console.log(beAbsolutePath('..\PRUEBA2.md'));
console.log(transIntoAbsolute('..\PRUEBA2.md'));
console.log(beAbsolutePath(transIntoAbsolute('..\PRUEBA2.md')));
module.exports = { beAbsolutePath, transIntoAbsolute };
