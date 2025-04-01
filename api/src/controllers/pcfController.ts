import { Request, Response } from 'express';
import { createPCF, getPCFById, getAllPCFs } from '../services/pcfService';

interface PCFParams {
  id: string;
}

const submitPCF = (req: Request, res: Response): void => {
  const {
    productName,
    declaredUnit,
    emission,
  }: { productName: string; declaredUnit: string; emission: number } = req.body;
  const newPCF = createPCF(productName, declaredUnit, emission);
  res.status(201).json(newPCF);
};

const fetchPCFById = (req: Request<PCFParams>, res: Response): void => {
  const { id } = req.params;
  const pcf = getPCFById(id);
  if (!pcf) {
    res.status(404).json({ message: 'PCF not found' });
  }
  res.json(pcf);
};

const fetchAllPCFs = (req: Request, res: Response): void => {
  const pcfList = getAllPCFs();
  res.json(pcfList);
};

export { submitPCF, fetchPCFById, fetchAllPCFs };
