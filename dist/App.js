"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importStar(require("react"));
const { ipcRenderer } = window.require("electron");
const drawerWidth = 240;
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        WebkitAppRegion: "drag",
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
        WebkitAppRegion: "no-drag",
    },
}));
const App = () => {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = (0, react_1.useState)("Dashboard");
    const menuItems = [
        { name: "Dashboard", icon: react_1.default.createElement(icons_1.Dashboard, null) },
        { name: "Workloads", icon: react_1.default.createElement(icons_1.Cloud, null) },
        { name: "Storage", icon: react_1.default.createElement(icons_1.Storage, null) },
        { name: "Service Discovery", icon: react_1.default.createElement(icons_1.Cloud, null) },
    ];
    const renderContent = () => {
        switch (selectedItem) {
            case "Dashboard":
                return react_1.default.createElement(core_1.Typography, { variant: "h4" }, "Dashboard Content");
            case "Workloads":
                return react_1.default.createElement(core_1.Typography, { variant: "h4" }, "Workloads Content");
            case "Storage":
                return react_1.default.createElement(core_1.Typography, { variant: "h4" }, "Storage Content");
            case "Service Discovery":
                return react_1.default.createElement(core_1.Typography, { variant: "h4" }, "Service Discovery Content");
            default:
                return react_1.default.createElement(core_1.Typography, { variant: "h4" }, "Select an item");
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
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(core_1.AppBar, { position: "fixed", className: classes.appBar },
            react_1.default.createElement(core_1.Toolbar, null,
                react_1.default.createElement(core_1.Typography, { variant: "h6", className: classes.title }, "K8s Lens Clone"),
                react_1.default.createElement("div", { className: classes.windowControls },
                    react_1.default.createElement(core_1.IconButton, { color: "inherit", onClick: handleMinimize },
                        react_1.default.createElement(icons_1.Remove, null)),
                    react_1.default.createElement(core_1.IconButton, { color: "inherit", onClick: handleMaximize },
                        react_1.default.createElement(icons_1.Crop169, null)),
                    react_1.default.createElement(core_1.IconButton, { color: "inherit", onClick: handleClose },
                        react_1.default.createElement(icons_1.Close, null))))),
        react_1.default.createElement(core_1.Drawer, { className: classes.drawer, variant: "permanent", classes: {
                paper: classes.drawerPaper,
            } },
            react_1.default.createElement("div", { className: classes.toolbar }),
            react_1.default.createElement(core_1.List, null, menuItems.map((item) => (react_1.default.createElement(core_1.ListItem, { button: true, key: item.name, onClick: () => setSelectedItem(item.name), selected: selectedItem === item.name },
                react_1.default.createElement(core_1.ListItemIcon, null, item.icon),
                react_1.default.createElement(core_1.ListItemText, { primary: item.name })))))),
        react_1.default.createElement("main", { className: classes.content },
            react_1.default.createElement("div", { className: classes.toolbar }),
            react_1.default.createElement(core_1.Container, null, renderContent()))));
};
exports.default = App;
