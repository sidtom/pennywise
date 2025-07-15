import { useState, useEffect } from "react";
import DashboardCalendar from "../calendar/calendar";
import AnalyticsDashboard from "../analytics/analyticsDashboard";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"; // Import useLocation
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
import "../../styles/theme.css";

const drawerWidth = 240;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const isSmallScreen = useMediaQuery("(max-width:50em)");
  const location = useLocation(); // Use useLocation to get the current path

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/calendar"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/analytics"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/settings"
            onClick={handleDrawerToggle}
          >
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'var(--primary-gradient)',
          boxShadow: 'var(--shadow-medium)'
        }}
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
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>
            💰 Pennywise
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
            background: 'var(--card-gradient)',
            borderRight: '1px solid var(--border-color)'
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
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '100vh',
          p: 3,
          width: '100%'
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/calendar" element={<DashboardCalendar selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route
            path="/settings"
            element={<Typography variant="h4">Settings Placeholder</Typography>}
          />
        </Routes>
      </Box>
    </Box>
  );
}

// Wrap the Dashboard component with Router
export default function App() {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
}