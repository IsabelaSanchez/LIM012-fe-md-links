const path = require('path');
const {
  beAbsolutePath, transIntoAbsolute, isDirectory, typeOfExtension, isFile,
  readingFiles,
  readingDirectories,
  getArrayOfFilesAndDirectories,
  getMDFiles,
  getMDLinks, 
  validateOption
} = require('../src/index.js');

const cwd = process.cwd();

describe('Testing para saber si beAbsolutePath es función', () => {
  it('debería ser una función', () => {
    expect(typeof beAbsolutePath).toBe('function');
  });
});

describe('Testing para saber si la ruta es absoluta', () => {
  it('debería dar true si es ruta absoluta', () => {
    // eslint-disable-next-line no-console
    // console.log(beAbsolutePath(path.join(cwd, '\\src')));
    expect(beAbsolutePath(path.join(cwd, '\\src'))).toBe(true);
  });

  it('debería dar false si es ruta relativa', () => {
    expect(beAbsolutePath('../pruebas/PRUEBA1.md')).toBe(false);
  });
});

describe('Testing para convertir ruta relativa a ruta absoluta', () => {
  it('transIntoAbsolute debería ser una función', () => {
    expect(typeof transIntoAbsolute).toBe('function');
  });
  it('debería convertir a ruta absoluta', () => {
    // console.log(transIntoAbsolute('..\PRUEBA2.md'));
    expect(transIntoAbsolute('../pruebas/PRUEBA1.md')).toBe('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\pruebas\\PRUEBA1.md');
  });
});

describe('Testing para saber si la ruta es directorio', () => {
  it('isDirectory debería ser una función', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('isDirectory debería dar true si es directorio', () => {
    expect(isDirectory('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas')).toBe(true);
  });
  it('isDirectory debería dar false si es archivo', () => {
    expect(isDirectory('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas\\PRUEBA1.md')).toBe(false);
  });
});

describe('Testing para saber si es archivo', () => {
  it('isFile debería ser una función', () => {
    expect(typeof isFile).toBe('function');
  });
  it('isFile debería dar true si es un archivo', () => {
    expect(isFile('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas\\PRUEBA1.md')).toBe(true);
  });
  it('isFile debería dar false si no es un archivo', () => {
    expect(isFile('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas')).toBe('false');
  });
});

describe('Testing para saber cual es la extensión del archivo es', () => {
  it('typeOfExtension debería ser un función', () => {
    expect(typeof typeOfExtension).toBe('function');
  });
  it('typeOfExtension debe identificar la extensión de esta ruta: .md', () => {
    expect(typeOfExtension('C:\\Users\\Isabella\\Documents\\Laboratoria-p\\LIM012-FE-MD-LINKS\\pruebas\\PRUEBA1.md')).toBe('.md');
  });
});

describe('Testing para saber si readingFiles lee archivos', () => {
  it('readingFiles debería ser una función', () => {
    expect(typeof readingFiles).toBe('function');
  });
});

describe('Testing para saber si readingDirectories lee directorios', () => {
  it('readingDirectories debería ser una función', () => {
    expect(typeof readingDirectories).toBe('function');
  });
});

describe('Testing para saber si getArrayOfFilesAndDirectories da los archivos y directorios de una ruta', () => {
  it('getArrayOfFilesAndDirectories debería ser una función', () => {
    expect(typeof getArrayOfFilesAndDirectories).toBe('function');
  });
});

describe('Testing para saber si getMDFiles da los archivos md de una ruta', () => {
  it('getMDFiles debería ser una función', () => {
    expect(typeof getMDFiles).toBe('function');
  });
});

describe('Testisng para saber si getMDLinks obtiene los links de una ruta', () => {
  it('getMDLinks debería ser una función', () => {
    expect(typeof getMDLinks).toBe('function');
  });
});

describe('Testing para saber si validateOption valida en estado de los links de los archivos md de una ruta', () =>{
  expect(typeof validateOption).toBe('function');
});
