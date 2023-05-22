/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserInfo from '../SettingsTabs/UserInfo';

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: '##fff',
        display: 'flex',
        height: '100vh',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Profile Settings" {...a11yProps(0)} />
        <Tab label="User Preferences" {...a11yProps(1)} />
        <Tab label="Favorites" {...a11yProps(2)} />
        <Tab label="Book Ratings" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <ProfileSettings /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <SecuritySettings /> */}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {/* <NotificationSettings /> */}
      </TabPanel>
    </Box>
  );
}

export default VerticalTabs;
