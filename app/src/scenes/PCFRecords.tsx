import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Paper,
} from '@mui/material';

interface PCF {
  id: string;
  productName: string;
  declaredUnit: string;
  emission: number;
  createdAt: string;
  category: string;
  emissionReduction: number;
}

const PCFRecords: React.FC = () => {
  const [pcfs, setPcfs] = useState<PCF[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllPCFs = () => {
    setIsLoading(true);

    axios
      .get('http://localhost:3001/api/pcfs')
      .then((response) => {
        setPcfs(response.data);
      })
      .catch((error) => {
        setError('Error fetching PCFs. Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllPCFs();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography sx={{ padding: 2 }} variant="h5" gutterBottom>
        PCF Records
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#333' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Product Name</TableCell>
                <TableCell sx={{ color: '#fff' }}>Declared Unit</TableCell>
                <TableCell sx={{ color: '#fff' }}>Emission (kgCO₂)</TableCell>
                <TableCell sx={{ color: '#fff' }}>Date of Creation</TableCell>
                <TableCell sx={{ color: '#fff' }}>Product Category</TableCell>
                <TableCell sx={{ color: '#fff' }}>
                  Emission Reduction Potential (kgCO₂)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pcfs.map((pcf) => (
                <TableRow
                  key={pcf.id}
                  sx={{
                    '&:nth-of-type(even)': { backgroundColor: '#444' },
                    '&:hover': { backgroundColor: '#555' },
                  }}
                >
                  <TableCell sx={{ color: '#fff' }}>
                    {pcf.productName}
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    {pcf.declaredUnit}
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    {pcf.emission} kgCO₂
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>{pcf.createdAt}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{pcf.category}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    {pcf.emissionReduction} kgCO₂
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default PCFRecords;
