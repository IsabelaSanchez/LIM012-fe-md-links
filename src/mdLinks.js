const { getMDLinks, validateOption } = require('./index.js');

const mdLinks = (route, options) => {
  const links = new Promise((resolve) => {
    if (options.validate === true) {
      resolve(validateOption(route));
    }
    if (options.validate === false) {
      resolve(getMDLinks(route));
    }
  });
  return links;
};
// console.log('Prueba de MDLinks, validate false');
// console.log(mdLinks('../pruebas', { validate: false })); //
// console.log(mdLinks('../pruebas', { validate: true }));
// console.log(''); //
module.exports = { mdLinks };
