const { beAbsolutePath, transIntoAbsolute } = require('../src/index.js');

const path = require('path');
const cwd = process.cwd();

describe('Testing para saber si beAbsolutePath es función', () => {
  it('debería ser una función', () => {
    expect(typeof beAbsolutePath).toBe('function');
  });
});

describe('Testing para saber si la ruta es absoluta', () => {
  it('debería dar true si es ruta absoluta', () => {
    console.log(beAbsolutePath(path.join(cwd,'\\src')));
    expect(beAbsolutePath(path.join(cwd,'\\src'))).toBe(true);
  });

  it('debería dar false si es ruta relativa', () => {
    expect(beAbsolutePath('../pruebas/PRUEBA1.md')).toBe(false);
  });
});

describe('Testing para convertir ruta relativa a ruta absoluta', () =>{
  it('transIntoAbsolute debería ser una función', () => {
    expect(typeof transIntoAbsolute).toBe('function');
  });
  it('debería convertir a ruta absoluta', () => {
    //console.log(transIntoAbsolute('..\PRUEBA2.md'));
    expect(transIntoAbsolute('..\PRUEBA2.md')).toBe('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-fe-md-links\\..PRUEBA2.md');
  });
});

