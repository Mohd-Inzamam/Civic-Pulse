import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Button,
  Box,
  Stack,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Divider,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", to: "/", icon: <HomeRoundedIcon fontSize="small" /> },
  {
    label: "Report",
    to: "/issues",
    icon: <ReportProblemRoundedIcon fontSize="small" />,
  },
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <DashboardRoundedIcon fontSize="small" />,
  },
];

const authLinks = [
  { label: "Login", to: "/login", icon: <LoginRoundedIcon fontSize="small" /> },
  {
    label: "Register",
    to: "/signup",
    icon: <PersonAddAltRoundedIcon fontSize="small" />,
  },
];

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return (
    <Box component={motion.div} animate={{ y: 0 }} initial={{ y: -24 }}>
      {children({ elevation: trigger ? 6 : 0 })}
    </Box>
  );
}

export default function Navbar({ setFilters }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const { user, logout } = useAuth();

  const ActiveUnderline = () => (
    <motion.div
      layoutId="nav-underline"
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -6,
        height: 3,
        borderRadius: 999,
        background: "currentColor",
        opacity: 0.85,
      }}
    />
  );

  const Brand = () => (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      component={RouterLink}
      to="/"
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 6px)",
          gap: "4px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 16 + i * 4,
              bgcolor: "primary.main",
              borderRadius: 1,
            }}
          />
        ))}
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, letterSpacing: 1, color: "text.primary" }}
      >
        CIVIC-PULSE
      </Typography>
    </Stack>
  );

  const NavButton = ({ to, label, icon }) => {
    const active = pathname === to || (to !== "/" && pathname.startsWith(to));
    return (
      <Box sx={{ position: "relative" }}>
        <Button
          component={RouterLink}
          to={to}
          size="medium"
          startIcon={icon}
          sx={{
            color: active ? "primary.main" : "text.secondary",
            fontWeight: active ? 700 : 500,
            textTransform: "none",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            transition: "all 0.25s ease",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.04)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {label}
        </Button>
        {active && <ActiveUnderline />}
      </Box>
    );
  };

  // 🔑 Shared search logic
  const handleSearch = (value) => {
    setSearchValue(value);
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const SearchBar = () => (
    <TextField
      size="small"
      placeholder="Search issues..."
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon color="action" />
          </InputAdornment>
        ),
        style: {
          borderRadius: 50,
          backgroundColor: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      }}
    />
  );

  return (
    <ElevationScroll>
      {({ elevation }) => (
        <AppBar
          position="sticky"
          color="inherit"
          elevation={elevation}
          sx={{
            backdropFilter: "blur(16px) saturate(180%)",
            bgcolor: "rgba(255,255,255,0.75)",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ py: 0.5 }}>
              {/* Left: Brand */}
              <Brand />

              {/* Desktop Links */}
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ ml: 4, display: { xs: "none", md: "flex" } }}
              >
                {links.map((l) => (
                  <NavButton key={l.to} {...l} />
                ))}
              </Stack>

              {/* Spacer */}
              <Box sx={{ flexGrow: 1 }} />

              {/* 🔎 Search (desktop) */}
              <Box sx={{ display: { xs: "none", md: "block" }, mr: 2 }}>
                <motion.div
                  initial={{ width: 200 }}
                  whileFocus={{ width: 300 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <TextField
                    size="small"
                    placeholder="Search issues..."
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      style: {
                        borderRadius: 50,
                        backgroundColor: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      },
                    }}
                  />
                </motion.div>
              </Box>

              {/* Right: Auth */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                {!user ? (
                  <>
                    {authLinks.map((l) => (
                      <Button
                        key={l.label}
                        component={RouterLink}
                        to={l.to}
                        startIcon={l.icon}
                        variant={l.label === "Register" ? "contained" : "text"}
                        sx={{ textTransform: "none" }}
                      >
                        {l.label}
                      </Button>
                    ))}
                  </>
                ) : (
                  <>
                    <Avatar
                      src={user.photoURL}
                      alt={user.displayName}
                      sx={{ width: 36, height: 36, cursor: "pointer" }}
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={() => setAnchorEl(null)}
                      PaperProps={{
                        sx: {
                          borderRadius: 3,
                          mt: 1,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <MenuItem onClick={() => setAnchorEl(null)}>
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          logout();
                          setAnchorEl(null);
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Stack>

              {/* Mobile: Menu Button */}
              <IconButton
                edge="end"
                sx={{ ml: 1, display: { xs: "inline-flex", md: "none" } }}
                onClick={() => setOpen(true)}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Toolbar>
          </Container>

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              sx: {
                width: 300,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                bgcolor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(12px)",
                boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ width: 300, p: 2 }} role="presentation">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Menu
                </Typography>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>
              <Divider sx={{ my: 1 }} />

              {/* 🔎 Search (mobile) */}
              <Box sx={{ mb: 2 }}>
                <SearchBar />
              </Box>

              <List>
                <AnimatePresence initial={false}>
                  {links.map((l, idx) => (
                    <motion.div
                      key={l.to}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ListItemButton
                        component={RouterLink}
                        to={l.to}
                        onClick={() => setOpen(false)}
                        selected={pathname === l.to}
                      >
                        {l.icon}
                        <ListItemText primary={l.label} sx={{ ml: 1 }} />
                      </ListItemButton>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </List>

              <Divider sx={{ my: 1 }} />

              <List>
                {!user ? (
                  authLinks.map((l) => (
                    <ListItemButton
                      key={l.label}
                      component={RouterLink}
                      to={l.to}
                      onClick={() => setOpen(false)}
                    >
                      {l.icon}
                      <ListItemText primary={l.label} sx={{ ml: 1 }} />
                    </ListItemButton>
                  ))
                ) : (
                  <>
                    <ListItemButton disabled>
                      <Avatar
                        src={user.photoURL}
                        alt={user.displayName}
                        sx={{ width: 28, height: 28, mr: 1 }}
                      />
                      <ListItemText primary={user.displayName} />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                    >
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </>
                )}
              </List>
            </Box>
          </Drawer>
        </AppBar>
      )}
    </ElevationScroll>
  );
}
