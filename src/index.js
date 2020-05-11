const path = require('path');

const beAbsolutePath = (route) => path.isAbsolute(route);

const transIntoAbsolute = (route) => path.resolve(route);
// eslint-disable-next-line no-console
console.log(transIntoAbsolute('../pruebas/PRUEBA1.md'));
// eslint-disable-next-line no-console
console.log(beAbsolutePath('..\\PRUEBA2.md'));
// eslint-disable-next-line no-console
console.log(transIntoAbsolute('..\\PRUEBA2.md'));
// eslint-disable-next-line no-console
console.log(beAbsolutePath(transIntoAbsolute('..\\PRUEBA2.md')));
module.exports = { beAbsolutePath, transIntoAbsolute };
