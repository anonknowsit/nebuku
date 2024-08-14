import {
  Box,
  createStyles,
  makeStyles,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tabContent: {
      marginTop: theme.spacing(2),
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const Workloads: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Dummy data
  const deployments = [
    {
      name: "frontend",
      replicas: 3,
      availableReplicas: 3,
      updatedReplicas: 3,
      status: "Running",
    },
    {
      name: "backend",
      replicas: 2,
      availableReplicas: 2,
      updatedReplicas: 2,
      status: "Running",
    },
    {
      name: "database",
      replicas: 1,
      availableReplicas: 1,
      updatedReplicas: 1,
      status: "Running",
    },
  ];

  const pods = [
    {
      name: "frontend-5d8c8d8f9c-abcd1",
      status: "Running",
      restarts: 0,
      age: "2d",
      cpu: "10m",
      memory: "32Mi",
    },
    {
      name: "frontend-5d8c8d8f9c-abcd2",
      status: "Running",
      restarts: 1,
      age: "2d",
      cpu: "12m",
      memory: "30Mi",
    },
    {
      name: "backend-7c9c8b8f7b-def01",
      status: "Running",
      restarts: 0,
      age: "1d",
      cpu: "20m",
      memory: "64Mi",
    },
    {
      name: "database-6b7b7c7d7e-ghi23",
      status: "Running",
      restarts: 0,
      age: "5d",
      cpu: "50m",
      memory: "128Mi",
    },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Workloads
      </Typography>
      <Tabs value={value} onChange={handleChange} aria-label="workloads tabs">
        <Tab label="Deployments" />
        <Tab label="Pods" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="deployments table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Replicas</TableCell>
                <TableCell align="right">Available</TableCell>
                <TableCell align="right">Up-to-date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deployments.map((deployment) => (
                <TableRow key={deployment.name}>
                  <TableCell component="th" scope="row">
                    {deployment.name}
                  </TableCell>
                  <TableCell align="right">{deployment.replicas}</TableCell>
                  <TableCell align="right">
                    {deployment.availableReplicas}
                  </TableCell>
                  <TableCell align="right">
                    {deployment.updatedReplicas}
                  </TableCell>
                  <TableCell>{deployment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="pods table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Restarts</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>CPU</TableCell>
                <TableCell>Memory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pods.map((pod) => (
                <TableRow key={pod.name}>
                  <TableCell component="th" scope="row">
                    {pod.name}
                  </TableCell>
                  <TableCell>{pod.status}</TableCell>
                  <TableCell align="right">{pod.restarts}</TableCell>
                  <TableCell>{pod.age}</TableCell>
                  <TableCell>{pod.cpu}</TableCell>
                  <TableCell>{pod.memory}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </div>
  );
};

export default Workloads;
