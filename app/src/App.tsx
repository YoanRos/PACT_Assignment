import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PCFSubmission from './scenes/PCFSubmission';
import PCFRecords from './scenes/PCFRecords';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('submission');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <Box sx={{ display: 'flex', flex: 1, padding: 2 }}>
        {activeTab === 'submission' && <PCFSubmission />}
        {activeTab === 'records' && <PCFRecords />}
      </Box>
    </Box>
  );
};

export default App;
