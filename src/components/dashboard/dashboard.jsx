import { useState } from "react";
import DashboardCalendar from "../calendar/calendar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import "./dashboard.css";

const drawerWidth = 240;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:50em)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/analytics" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/settings" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Top AppBar */}
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            {isSmallScreen && (
              <IconButton
                color="inherit"
                edge="start"
                sx={{ marginRight: 2 }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              Pennywise
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          open={!isSmallScreen || mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            width: isSmallScreen ? "auto" : drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: isSmallScreen ? "auto" : drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            ...(isSmallScreen
              ? {}
              : { marginLeft: `${drawerWidth}px` }), // Adjust margin for permanent drawer
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<DashboardCalendar />} />
            <Route
              path="/analytics"
              element={<Typography variant="h4">Analytics Placeholder</Typography>}
            />
            <Route
              path="/settings"
              element={<Typography variant="h4">Settings Placeholder</Typography>}
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default Dashboard;
