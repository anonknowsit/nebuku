import {
  AppBar,
  Collapse,
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
  ExpandLess,
  ExpandMore,
  Crop169 as MaximizeIcon,
  Remove as MinimizeIcon,
  Storage as StorageIcon,
} from "@material-ui/icons";
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ServiceDiscovery from "./ServiceDiscovery";
import Storage from "./Storage";
import Workloads from "./Workloads";

const { ipcRenderer } = window.require("electron");

const drawerWidth = 260;

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
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listItemText: {
      marginLeft: -theme.spacing(2),
    },
    listItemIcon: {
      minWidth: 40,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [workloadsOpen, setWorkloadsOpen] = useState(false);
  const [storageOpen, setStorageOpen] = useState(false);
  const [serviceDiscoveryOpen, setServiceDiscoveryOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    {
      name: "Workloads",
      icon: <CloudIcon />,
      subItems: ["Overview", "Deployments", "Pods"],
    },
    {
      name: "Storage",
      icon: <StorageIcon />,
      subItems: [
        "Overview",
        "ConfigMaps",
        "Secrets",
        "Persistent Volume Claims",
      ],
    },
    {
      name: "Service Discovery",
      icon: <CloudIcon />,
      subItems: ["Overview", "Services", "Ingresses"],
    },
  ];

  const handleWorkloadsClick = () => {
    setWorkloadsOpen(!workloadsOpen);
    setSelectedItem("Workloads/Overview");
  };

  const handleStorageClick = () => {
    setStorageOpen(!storageOpen);
    setSelectedItem("Storage/Overview");
  };

  const handleServiceDiscoveryClick = () => {
    setServiceDiscoveryOpen(!serviceDiscoveryOpen);
    setSelectedItem("Service Discovery/Overview");
  };

  const renderContent = () => {
    const [mainItem, subItem] = selectedItem.split("/");
    switch (mainItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Workloads":
        return <Workloads subItem={subItem || "Overview"} />;
      case "Storage":
        return <Storage subItem={subItem || "Overview"} />;
      case "Service Discovery":
        return <ServiceDiscovery subItem={subItem || "Overview"} />;
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
            <React.Fragment key={item.name}>
              <ListItem
                button
                onClick={
                  item.name === "Workloads"
                    ? handleWorkloadsClick
                    : item.name === "Storage"
                    ? handleStorageClick
                    : item.name === "Service Discovery"
                    ? handleServiceDiscoveryClick
                    : () => setSelectedItem(item.name)
                }
                selected={selectedItem.startsWith(item.name)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                {item.subItems &&
                  (item.name === "Workloads" ? (
                    workloadsOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : item.name === "Storage" ? (
                    storageOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : serviceDiscoveryOpen ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItem>
              {item.subItems && (
                <Collapse
                  in={
                    item.name === "Workloads"
                      ? workloadsOpen
                      : item.name === "Storage"
                      ? storageOpen
                      : serviceDiscoveryOpen
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        button
                        className={classes.nested}
                        key={subItem}
                        onClick={() =>
                          setSelectedItem(`${item.name}/${subItem}`)
                        }
                        selected={selectedItem === `${item.name}/${subItem}`}
                      >
                        <ListItemText primary={subItem} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
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
