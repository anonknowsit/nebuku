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

const Storage: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Dummy data
  const configMaps = [
    { name: "app-config", namespace: "default", dataCount: 3, age: "5d" },
    { name: "db-config", namespace: "database", dataCount: 2, age: "2d" },
    {
      name: "logging-config",
      namespace: "monitoring",
      dataCount: 5,
      age: "1w",
    },
  ];

  const secrets = [
    {
      name: "api-keys",
      namespace: "default",
      type: "Opaque",
      dataCount: 2,
      age: "3d",
    },
    {
      name: "tls-cert",
      namespace: "ingress",
      type: "kubernetes.io/tls",
      dataCount: 2,
      age: "1w",
    },
    {
      name: "db-credentials",
      namespace: "database",
      type: "Opaque",
      dataCount: 3,
      age: "5d",
    },
  ];

  const persistentVolumeClaims = [
    {
      name: "data-storage",
      namespace: "default",
      status: "Bound",
      volume: "pv-001",
      capacity: "10Gi",
      accessModes: "RWO",
      age: "1w",
    },
    {
      name: "log-storage",
      namespace: "monitoring",
      status: "Bound",
      volume: "pv-002",
      capacity: "5Gi",
      accessModes: "RWX",
      age: "3d",
    },
    {
      name: "backup-storage",
      namespace: "backup",
      status: "Pending",
      volume: "-",
      capacity: "20Gi",
      accessModes: "RWO",
      age: "1h",
    },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Storage
      </Typography>
      <Tabs value={value} onChange={handleChange} aria-label="storage tabs">
        <Tab label="ConfigMaps" />
        <Tab label="Secrets" />
        <Tab label="Persistent Volume Claims" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="configmaps table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Namespace</TableCell>
                <TableCell align="right">Data</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {configMaps.map((cm) => (
                <TableRow key={cm.name}>
                  <TableCell component="th" scope="row">
                    {cm.name}
                  </TableCell>
                  <TableCell>{cm.namespace}</TableCell>
                  <TableCell align="right">{cm.dataCount}</TableCell>
                  <TableCell>{cm.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="secrets table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Namespace</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Data</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {secrets.map((secret) => (
                <TableRow key={secret.name}>
                  <TableCell component="th" scope="row">
                    {secret.name}
                  </TableCell>
                  <TableCell>{secret.namespace}</TableCell>
                  <TableCell>{secret.type}</TableCell>
                  <TableCell align="right">{secret.dataCount}</TableCell>
                  <TableCell>{secret.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="persistent volume claims table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Namespace</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Access Modes</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {persistentVolumeClaims.map((pvc) => (
                <TableRow key={pvc.name}>
                  <TableCell component="th" scope="row">
                    {pvc.name}
                  </TableCell>
                  <TableCell>{pvc.namespace}</TableCell>
                  <TableCell>{pvc.status}</TableCell>
                  <TableCell>{pvc.volume}</TableCell>
                  <TableCell>{pvc.capacity}</TableCell>
                  <TableCell>{pvc.accessModes}</TableCell>
                  <TableCell>{pvc.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </div>
  );
};

export default Storage;
