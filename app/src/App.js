import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [productName, setProductName] = useState('');
  const [declaredUnit, setDeclaredUnit] = useState('');
  const [emission, setEmission] = useState('');
  const [pcfs, setPcfs] = useState([]);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPCF = { productName, declaredUnit, emission: parseFloat(emission) };

    // Making API call to submit PCF data
    axios.post('http://localhost:3001/api/footprints', newPCF)
      .then((response) => {
        console.log('PCF submitted:', response.data);
        getAllPCFs();  // Refresh the list after submission
      })
      .catch((error) => {
        console.error('Error submitting PCF:', error);
      });
  };

  // Function to fetch all PCFs
  const getAllPCFs = () => {
    axios.get('http://localhost:3001/api/pcfs')
      .then((response) => {
        setPcfs(response.data);  // Set the PCF records to state
      })
      .catch((error) => {
        console.error('Error fetching PCFs:', error);
      });
  };

  // Fetch all PCFs when the component mounts
  useEffect(() => {
    getAllPCFs();
  }, []);

  return (
    <div>
      <h1>PCF Submission</h1>
      
      {/* Form to submit new PCF record */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Declared Unit"
          value={declaredUnit}
          onChange={(e) => setDeclaredUnit(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Emission (kgCO2)"
          value={emission}
          onChange={(e) => setEmission(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h2>PCF Records</h2>
      <ul>
        {/* Render the list of PCF records */}
        {pcfs.map((pcf) => (
          <li key={pcf.id}>
            {pcf.productName} ({pcf.declaredUnit}): {pcf.emission} kgCO2
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
