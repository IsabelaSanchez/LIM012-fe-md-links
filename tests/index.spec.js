const { beAbsolutePath } = require('../src/index.js');

describe('Testing para saber si es un boolean', () => {

  it('debería ser un boolean', () => {
    expect(typeof beAbsolutePath).toBe('boolean');
  });
});

describe('Testing para saber si la ruta es absoluta', () =>{
  it('debería dar true si es ruta absoluta', () => {
    expect(beAbsolutePath).toBe(true)
  });
  it('debería dar false si es ruta relativa', () => {
    expect(beAbsolutePath).toBe(false)
  });
});


