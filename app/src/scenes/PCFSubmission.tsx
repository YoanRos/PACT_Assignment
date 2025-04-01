import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Button,
  TextField,
  Typography,
} from '@mui/material';

interface PCFFormData {
  productName: string;
  declaredUnit: string;
  emission: string;
  category: string;
  emissionReduction: string;
}

const PCFSubmission: React.FC = () => {
  const [formData, setFormData] = useState<PCFFormData>({
    productName: '',
    declaredUnit: '',
    emission: '',
    category: '',
    emissionReduction: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNaN(parseFloat(formData.emission))) {
      setError('Emission must be a valid number');
      return;
    }

    const newPCF = {
      ...formData,
      emission: parseFloat(formData.emission),
      emissionReduction: formData.emissionReduction
        ? parseFloat(formData.emissionReduction)
        : undefined, // If empty, leave it undefined
    };

    setIsLoading(true);
    setError(null);

    axios
      .post('http://localhost:3001/api/footprints', newPCF)
      .then(() => {
        setSuccessMessage('PCF successfully submitted!');
        resetForm();
      })
      .catch(() => {
        setError('Error submitting PCF. Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      declaredUnit: '',
      emission: '',
      category: '',
      emissionReduction: '',
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ padding: 2 }} gutterBottom>
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
          value={formData.productName}
          onChange={handleChange}
          name="productName"
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
          }}
          required
        />
        <TextField
          label="Declared Unit"
          variant="outlined"
          fullWidth
          value={formData.declaredUnit}
          onChange={handleChange}
          name="declaredUnit"
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
          }}
          required
        />
        <TextField
          label="Emission (kgCO₂)"
          variant="outlined"
          fullWidth
          type="number"
          value={formData.emission}
          onChange={handleChange}
          name="emission"
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
          }}
          required
        />
        <TextField
          label="Product Category"
          variant="outlined"
          fullWidth
          value={formData.category}
          onChange={handleChange}
          name="category"
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
          }}
        />
        <TextField
          label="Emission Reduction Potential (kgCO₂)"
          variant="outlined"
          fullWidth
          type="number"
          value={formData.emissionReduction}
          onChange={handleChange}
          name="emissionReduction"
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
          }}
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
