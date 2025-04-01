import { v4 as uuidv4 } from 'uuid';

interface PCF {
  id: string;
  productName: string;
  declaredUnit: string;
  emission: number;
  category?: string;
  emissionReduction?: number;
  createdAt: Date;
}

const pcfRecords: PCF[] = [];

const createPCF = (
  productName: string,
  declaredUnit: string,
  emission: number,
  category?: string,
  emissionReduction?: number
): PCF => {
  const newPCF: PCF = {
    id: uuidv4(),
    productName,
    declaredUnit,
    emission,
    category,
    emissionReduction,
    createdAt: new Date(),
  };
  console.log(pcfRecords);
  pcfRecords.push(newPCF);
  console.log(pcfRecords);

  return newPCF;
};

const getPCFById = (id: string): PCF | undefined => {
  return pcfRecords.find((pcf) => pcf.id === id);
};

const getAllPCFs = (): PCF[] => {
  return pcfRecords;
};

export { createPCF, getPCFById, getAllPCFs };
