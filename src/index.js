const path = require('path');
let filename = path.basename('../pruebas/PRUEBA1.md');
const beAbsolutePath = path.isAbsolute(filename);

console.log('bla bla')

module.exports= {beAbsolutePath};

