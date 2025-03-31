const { v4: uuidv4 } = require('uuid');

// In-memory DB (array)
const pcfRecords = [];

const createPCF = (productName, declaredUnit, emission) => {
  const newPCF = {
    id: uuidv4(),
    productName,
    declaredUnit,
    emission,
  };
  pcfRecords.push(newPCF);
  return newPCF;
};

const getPCFById = (id) => {
  return pcfRecords.find(pcf => pcf.id === id);
};

const getAllPCFs = () => {
  return pcfRecords;
};

module.exports = { createPCF, getPCFById, getAllPCFs };
