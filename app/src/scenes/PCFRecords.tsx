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
      <Typography variant="h5" gutterBottom>
        PCF Records
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Declared Unit</TableCell>
                <TableCell>Emission (kgCO2)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pcfs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>No PCF records found.</TableCell>
                </TableRow>
              ) : (
                pcfs.map((pcf) => (
                  <TableRow key={pcf.id}>
                    <TableCell>{pcf.productName}</TableCell>
                    <TableCell>{pcf.declaredUnit}</TableCell>
                    <TableCell>{pcf.emission} kgCO2</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default PCFRecords;
