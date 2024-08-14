import {
  AppBar,
  Container,
  createStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Close as CloseIcon,
  Cloud as CloudIcon,
  Dashboard as DashboardIcon,
  Crop169 as MaximizeIcon,
  Remove as MinimizeIcon,
  Storage as StorageIcon,
} from "@material-ui/icons";
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Workloads from "./Workloads";

const { ipcRenderer } = window.require("electron");

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      WebkitAppRegion: "drag" as any,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
    },
    windowControls: {
      display: "flex",
      alignItems: "center",
      WebkitAppRegion: "no-drag" as any,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Workloads", icon: <CloudIcon /> },
    { name: "Storage", icon: <StorageIcon /> },
    { name: "Service Discovery", icon: <CloudIcon /> },
  ];

  const renderContent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Workloads":
        return <Workloads />;
      case "Storage":
        return <Typography variant="h4">Storage Content</Typography>;
      case "Service Discovery":
        return <Typography variant="h4">Service Discovery Content</Typography>;
      default:
        return <Typography variant="h4">Select an item</Typography>;
    }
  };

  const handleMinimize = () => {
    ipcRenderer.send("app-minimize");
  };

  const handleMaximize = () => {
    ipcRenderer.send("app-maximize");
  };

  const handleClose = () => {
    ipcRenderer.send("app-quit");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            K8s Lens Clone
          </Typography>
          <div className={classes.windowControls}>
            <IconButton color="inherit" onClick={handleMinimize}>
              <MinimizeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleMaximize}>
              <MaximizeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.name}
              onClick={() => setSelectedItem(item.name)}
              selected={selectedItem === item.name}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>{renderContent()}</Container>
      </main>
    </div>
  );
};

export default App;
