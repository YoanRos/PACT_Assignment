import React from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#242424' }}>
      <Toolbar>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => onTabChange(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          sx={{ width: '100%' }}
        >
          <Tab label="PCF Submission" value="submission" />
          <Tab label="PCF Records" value="records" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
