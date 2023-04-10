import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab, { TabClasses } from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { TabClassKey, TabProps } from '@material-ui/core';

declare module '@material-ui/core/styles/overrides' {
  interface TabClasses {
    indicator: string;
  }
}
/*
declare module '@material-ui/core/Tabs' {
  interface TabsProps extends TabProps<TabClassKey> {
    // add any additional props that you need here
  }
}
*/
const useStyles = makeStyles(() => ({
  root: {
    '&$selected': {
      backgroundColor: "red",
      color: "white",
    },
  },
  selected: {
    color: 'white',
    borderBottom: 'none',
  },
  indicator: {
    display: 'none',
  },
}));

interface CustomTabProps {
  label: string;
}

function CustomTab(props: CustomTabProps) {
  const classes = useStyles();
  return <Tab {...props} classes={{ root: classes.root, selected: classes.selected }}/>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Returns the chosen tab view
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MyTabs() {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} textColor='secondary' sx={{backgroundColor: 'lightgray'}}>
          <CustomTab label="Item One" {...a11yProps(0)} />
          <CustomTab label="Item Two" {...a11yProps(1)} />
          <CustomTab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}