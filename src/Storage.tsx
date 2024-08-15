import {
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

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
  })
);

interface StorageProps {
  subItem: string;
}

const Storage: React.FC<StorageProps> = ({ subItem }) => {
  const classes = useStyles();

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

  const recentStorageResources = [
    { name: "new-config", type: "ConfigMap", namespace: "default", age: "2h" },
    { name: "api-token", type: "Secret", namespace: "api", age: "5h" },
    {
      name: "data-volume",
      type: "PersistentVolumeClaim",
      namespace: "storage",
      age: "1d",
    },
  ];

  const renderOverview = () => (
    <>
      <Typography variant="h6" className={classes.title}>
        Recently Created Storage Resources
      </Typography>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="recent storage resources table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Namespace</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentStorageResources.map((resource) => (
              <TableRow key={resource.name}>
                <TableCell component="th" scope="row">
                  {resource.name}
                </TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.namespace}</TableCell>
                <TableCell>{resource.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderConfigMaps = () => (
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
  );

  const renderSecrets = () => (
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
  );

  const renderPersistentVolumeClaims = () => (
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
  );

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Storage - {subItem}
      </Typography>
      {subItem === "Overview" && renderOverview()}
      {subItem === "ConfigMaps" && renderConfigMaps()}
      {subItem === "Secrets" && renderSecrets()}
      {subItem === "Persistent Volume Claims" && renderPersistentVolumeClaims()}
    </div>
  );
};

export default Storage;
