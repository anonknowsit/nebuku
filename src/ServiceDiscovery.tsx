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

const ServiceDiscovery: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Dummy data
  const ingresses = [
    {
      name: "main-ingress",
      namespace: "default",
      hosts: ["example.com"],
      address: "10.0.0.1",
      ports: "80, 443",
      age: "5d",
    },
    {
      name: "api-ingress",
      namespace: "api",
      hosts: ["api.example.com"],
      address: "10.0.0.2",
      ports: "443",
      age: "2d",
    },
    {
      name: "admin-ingress",
      namespace: "admin",
      hosts: ["admin.example.com"],
      address: "10.0.0.3",
      ports: "443",
      age: "1w",
    },
  ];

  const services = [
    {
      name: "frontend-svc",
      namespace: "default",
      type: "ClusterIP",
      clusterIP: "10.0.0.10",
      externalIP: "-",
      ports: "80/TCP",
      age: "5d",
    },
    {
      name: "backend-svc",
      namespace: "default",
      type: "ClusterIP",
      clusterIP: "10.0.0.11",
      externalIP: "-",
      ports: "8080/TCP",
      age: "5d",
    },
    {
      name: "db-svc",
      namespace: "database",
      type: "ClusterIP",
      clusterIP: "10.0.0.12",
      externalIP: "-",
      ports: "5432/TCP",
      age: "4d",
    },
    {
      name: "loadbalancer-svc",
      namespace: "ingress",
      type: "LoadBalancer",
      clusterIP: "10.0.0.13",
      externalIP: "203.0.113.1",
      ports: "80:30080/TCP, 443:30443/TCP",
      age: "1w",
    },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Service Discovery
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="service discovery tabs"
      >
        <Tab label="Ingresses" />
        <Tab label="Services" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="ingresses table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Namespace</TableCell>
                <TableCell>Hosts</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Ports</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingresses.map((ingress) => (
                <TableRow key={ingress.name}>
                  <TableCell component="th" scope="row">
                    {ingress.name}
                  </TableCell>
                  <TableCell>{ingress.namespace}</TableCell>
                  <TableCell>{ingress.hosts.join(", ")}</TableCell>
                  <TableCell>{ingress.address}</TableCell>
                  <TableCell>{ingress.ports}</TableCell>
                  <TableCell>{ingress.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="services table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Namespace</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Cluster IP</TableCell>
                <TableCell>External IP</TableCell>
                <TableCell>Ports</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.name}>
                  <TableCell component="th" scope="row">
                    {service.name}
                  </TableCell>
                  <TableCell>{service.namespace}</TableCell>
                  <TableCell>{service.type}</TableCell>
                  <TableCell>{service.clusterIP}</TableCell>
                  <TableCell>{service.externalIP}</TableCell>
                  <TableCell>{service.ports}</TableCell>
                  <TableCell>{service.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </div>
  );
};

export default ServiceDiscovery;
