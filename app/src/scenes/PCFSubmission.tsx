import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

interface PCF {
  id: string;
  productName: string;
  declaredUnit: string;
  emission: number;
}

const PCFSubmission: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [declaredUnit, setDeclaredUnit] = useState<string>('');
  const [emission, setEmission] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNaN(parseFloat(emission))) {
      setError('Emission must be a valid number');
      return;
    }

    const newPCF: Omit<PCF, 'id'> = {
      productName,
      declaredUnit,
      emission: parseFloat(emission),
    };

    setIsLoading(true);
    setError(null);

    axios
      .post('http://localhost:3001/api/footprints', newPCF)
      .then((response) => {
        setSuccessMessage('PCF successfully submitted!');
        resetForm();
      })
      .catch((error) => {
        setError('Error submitting PCF. Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  const resetForm = () => {
    setProductName('');
    setDeclaredUnit('');
    setEmission('');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        PCF Submission
      </Typography>

      {successMessage && (
        <Typography color="green">{successMessage}</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Set label text color to white
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'white',
            },
          }}
          required
        />
        <TextField
          label="Declared Unit"
          variant="outlined"
          fullWidth
          value={declaredUnit}
          onChange={(e) => setDeclaredUnit(e.target.value)}
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Set label text color to white
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'white',
            },
          }}
          required
        />
        <TextField
          label="Emission (kgCO2)"
          variant="outlined"
          fullWidth
          type="number"
          value={emission}
          onChange={(e) => setEmission(e.target.value)}
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Set label text color to white
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'white',
            },
          }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
    </Box>
  );
};

export default PCFSubmission;
