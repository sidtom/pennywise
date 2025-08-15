import { useState } from "react";
import DashboardCalendar from "../calendar/calendar";
import AnalyticsDashboard from "../analytics/analyticsDashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import useLocation
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

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const isSmallScreen = useMediaQuery("(max-width:50em)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box className="drawer-list">
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/calendar"
            onClick={handleDrawerToggle}
            className="drawer-item"
          >
            <ListItemIcon className="drawer-icon">
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="drawer-text" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/analytics"
            onClick={handleDrawerToggle}
            className="drawer-item"
          >
            <ListItemIcon className="drawer-icon">
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" className="drawer-text" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/settings"
            onClick={handleDrawerToggle}
            className="drawer-item"
          >
            <ListItemIcon className="drawer-icon">
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" className="drawer-text" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box className="dashboard-container">
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
          width: isSmallScreen ? "auto" : 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isSmallScreen ? "auto" : 240,
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
          width: '100%',
          overflow: 'hidden'
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