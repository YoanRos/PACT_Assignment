const pcfService = require('../services/pcfService');

const submitPCF = (req, res) => {
  const { productName, declaredUnit, emission } = req.body;
  const newPCF = pcfService.createPCF(productName, declaredUnit, emission);
  res.status(201).json(newPCF);
};

const getPCFById = (req, res) => {
  const { id } = req.params;
  const pcf = pcfService.getPCFById(id);
  if (!pcf) {
    return res.status(404).json({ message: 'PCF not found' });
  }
  res.json(pcf);
};

const getAllPCFs = (req, res) => {
  const pcfList = pcfService.getAllPCFs();
  res.json(pcfList);
};

module.exports = { submitPCF, getPCFById, getAllPCFs };
