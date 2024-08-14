import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
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
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  // Dummy data
  const clusterInfo = {
    name: "production-cluster",
    version: "v1.21.0",
    nodes: 5,
    pods: 42,
    deployments: 12,
    services: 15,
    cpu: "65%",
    memory: "78%",
    storage: "45%",
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Cluster Overview: {clusterInfo.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Cluster Version</Typography>
            <Typography variant="h4">{clusterInfo.version}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Nodes</Typography>
            <Typography variant="h4">{clusterInfo.nodes}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Pods</Typography>
            <Typography variant="h4">{clusterInfo.pods}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Deployments</Typography>
            <Typography variant="h4">{clusterInfo.deployments}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Services</Typography>
            <Typography variant="h4">{clusterInfo.services}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">CPU Usage</Typography>
            <Typography variant="h4">{clusterInfo.cpu}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Memory Usage</Typography>
            <Typography variant="h4">{clusterInfo.memory}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Storage Usage</Typography>
            <Typography variant="h4">{clusterInfo.storage}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
