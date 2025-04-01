import { Request, Response } from 'express';
import { createPCF, getPCFById, getAllPCFs } from '../services/pcfService';
import { format } from 'date-fns';

interface PCFParams {
  id: string;
}

const submitPCF = (req: Request, res: Response): void => {
  const {
    productName,
    declaredUnit,
    emission,
    category,
    emissionReduction,
  }: {
    productName: string;
    declaredUnit: string;
    emission: number;
    category?: string;
    emissionReduction?: number;
  } = req.body;
  const newPCF = createPCF(
    productName,
    declaredUnit,
    emission,
    category,
    emissionReduction
  );
  res.status(201).json(newPCF);
};

const fetchPCFById = (req: Request<PCFParams>, res: Response): void => {
  const { id } = req.params;
  const pcf = getPCFById(id);
  if (!pcf) {
    res.status(404).json({ message: 'PCF not found' });
    return;
  }
  const formattedPCF = {
    ...pcf,
    createdAt: format(new Date(pcf.createdAt), 'MMMM dd, yyyy'), // Format createdAt
  };
  res.json(formattedPCF);
};

const fetchAllPCFs = (req: Request, res: Response): void => {
  const pcfList = getAllPCFs();
  const formattedPCFs = pcfList.map((pcf) => ({
    ...pcf,
    createdAt: format(new Date(pcf.createdAt), 'MMMM dd, yyyy'),
  }));
  res.json(formattedPCFs);
};

export { submitPCF, fetchPCFById, fetchAllPCFs };
