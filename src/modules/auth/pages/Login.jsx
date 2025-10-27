import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // user | admin
  const [form, setForm] = useState({
    email: "",
    password: "",
    department: "",
    employeeId: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const handleRoleChange = (_, newRole) => {
  //   if (newRole) {
  //     setRole(newRole);
  //     setForm({
  //       email: "",
  //       password: "",
  //       department: "",
  //       employeeId: "",
  //     });
  //     setFieldErrors({});
  //   }
  // };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        break;
      case "department":
        if (role === "admin" && !value) return "Department is required";
        break;
      case "employeeId":
        if (role === "admin" && !value) return "Employee ID is required";
        if (role === "admin" && !/^[A-Za-z0-9-]+$/.test(value))
          return "Employee ID must be alphanumeric";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach((key) => {
      // Skip admin fields if user role
      if (role === "user" && (key === "department" || key === "employeeId"))
        return;

      const msg = validateField(key, form[key]);
      if (msg) newErrors[key] = msg;
    });

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Example API call (adjust according to backend route)
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role, rememberMe }),
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          errorData = { message: "Unexpected server response" };
        }
        throw new Error(errorData.message || "Failed to login");
      }

      const data = await res.json();

      // Store token (adjust according to your auth setup)
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", role);

      setSuccess("Login successful! Redirecting...");

      // Redirect based on role
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <Card className="shadow-lg rounded-4">
              <CardContent className="p-4">
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}>
                  Login
                </Typography>

                {/* Role toggle with animated underline */}
                <div className="mb-3">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      position: "relative",
                      background: "#f5f5f5",
                      borderRadius: "12px",
                      padding: "4px",
                    }}>
                    {["user", "admin"].map((r) => (
                      <Button
                        key={r}
                        onClick={() => setRole(r)}
                        sx={{
                          flex: 1,
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: role === r ? "bold" : 500,
                          color: role === r ? "black" : "gray",
                          background: "transparent",
                        }}>
                        {r === "user" ? "User" : "Admin"}
                      </Button>
                    ))}

                    <motion.div
                      layoutId="underline"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      style={{
                        position: "absolute",
                        bottom: 4,
                        left: role === "user" ? "4px" : "50%",
                        width: "calc(50% - 8px)",
                        height: "4px",
                        borderRadius: "2px",
                        background: "#1976d2",
                      }}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}>
                      <Alert severity="error" className="mb-3">
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}>
                      <Alert
                        severity="success"
                        icon={<CheckCircleIcon fontSize="inherit" />}
                        className="mb-3">
                        {success}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}>
                    <TextField
                      label="Email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      margin="normal"
                      error={Boolean(fieldErrors.email)}
                      helperText={fieldErrors.email}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}>
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      margin="normal"
                      error={Boolean(fieldErrors.password)}
                      helperText={fieldErrors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                              sx={{ color: "#666" }}>
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  {/* Conditional Admin Fields */}
                  <AnimatePresence mode="wait">
                    {role === "admin" ? (
                      <motion.div
                        key="admin-login-fields"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}>
                        <TextField
                          label="Department"
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          error={Boolean(fieldErrors.department)}
                          helperText={
                            fieldErrors.department ||
                            "e.g., Public Works, Water Supply"
                          }
                          placeholder="Enter your department"
                        />

                        <TextField
                          label="Employee ID"
                          name="employeeId"
                          value={form.employeeId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          error={Boolean(fieldErrors.employeeId)}
                          helperText={
                            fieldErrors.employeeId ||
                            "Official employee identification"
                          }
                          placeholder="e.g., EMP-2024-001"
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* Remember me checkbox and forgot password */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: role === "admin" ? 0.5 : 0.3,
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "16px",
                      marginBottom: "8px",
                    }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.875rem" }}>
                          Remember me
                        </Typography>
                      }
                    />
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.875rem",
                        color: "#1976d2",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.04)",
                        },
                      }}
                      onClick={() => navigate("/forgot-password")}>
                      Forgot Password?
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: role === "admin" ? 0.6 : 0.4,
                    }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, py: 1.2, borderRadius: "12px" }}
                      disabled={loading}>
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </motion.div>

                  <Divider sx={{ my: 2 }} />

                  <Typography align="center" variant="body2">
                    Don't have an account?{" "}
                    <Button
                      variant="text"
                      onClick={() => navigate("/signup")}
                      sx={{ textTransform: "none" }}>
                      Sign Up
                    </Button>
                  </Typography>

                  {/* Quick Demo Login (Optional - for development) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: role === "admin" ? 0.8 : 0.6,
                    }}>
                    <Typography
                      align="center"
                      variant="caption"
                      sx={{ mt: 2, color: "#666" }}>
                      {role === "admin"
                        ? "Demo Admin: admin@demo.com | password123 | Dept: IT | ID: EMP-001"
                        : "Demo User: user@demo.com | password123"}
                    </Typography>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
