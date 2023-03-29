const objRandom = {
  tiposContrato: ['Material', 'Serviço'],
  empresas: [
    'Jorginho Borracharia LTDA',
    'Shopping RioMar Aracaju',
    'Conta Voltz',
    'Energisa Roraima',
    'Nike',
    'Adidas',
  ],
  codigosCredor: ['123', '456', '789', '987', '654', '321', '221', '222'],
};

export function generateEnergisaData() {
  return {
    numeroContratos: Math.round(Math.random() * 30),
    nomeCredor:
      objRandom.empresas[Math.floor(Math.random() * objRandom.empresas.length)],
    codigoCredor:
      objRandom.codigosCredor[
        Math.floor(Math.random() * objRandom.codigosCredor.length)
      ],
    tipoContrato:
      objRandom.tiposContrato[
        Math.floor(Math.random() * objRandom.tiposContrato.length)
      ],
  };
}
