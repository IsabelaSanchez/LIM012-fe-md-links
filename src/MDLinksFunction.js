const { isAValidPath, getMDLinks, validateOption } = require('./index.js');

const mdLinks = (route, options) => {
  if (!isAValidPath(route)) {
    throw Error('La ruta no es valida');
  } else if (isAValidPath(route)) {
    // let finalMDLinkArray = [];
    const finalLinks = new Promise((resolve) => {
      if (options.validate === true) {
        resolve(validateOption(route));
      }
      if (options.validate === false) {
        resolve(getMDLinks(route));
      }
    });
    // finalMDLinkArray.push(finalLinks);
    return finalLinks;
  }
};
console.log('Prueba de MDLinks, validate false');
console.log(mdLinks('../pruebas', {validate:false})); // <-¿por qué no devuelve un array? :/
// console.log(mdLinks('../pruebas', {validate:true}));
// console.log(''); // 
