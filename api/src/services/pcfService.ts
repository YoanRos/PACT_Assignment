import { v4 as uuidv4 } from 'uuid';

interface PCF {
  id: string;
  productName: string;
  declaredUnit: string;
  emission: number;
}

const pcfRecords: PCF[] = [];

const createPCF = (
  productName: string,
  declaredUnit: string,
  emission: number
): PCF => {
  const newPCF: PCF = {
    id: uuidv4(),
    productName,
    declaredUnit,
    emission,
  };
  pcfRecords.push(newPCF);
  return newPCF;
};

const getPCFById = (id: string): PCF | undefined => {
  return pcfRecords.find((pcf) => pcf.id === id);
};

const getAllPCFs = (): PCF[] => {
  return pcfRecords;
};

export { createPCF, getPCFById, getAllPCFs };
