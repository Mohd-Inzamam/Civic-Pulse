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
  // ToggleButton,
  // ToggleButtonGroup,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { LoadScript, Autocomplete } from "@react-google-maps/api";
// import { useRef } from "react";

// const libraries = ["places"];
// let
const ROLES = [
  "Commissioner",
  "Deputy Commissioner",
  "Chief Engineer",
  "Assistant Engineer",
  "Junior Engineer",
  "Sanitation Officer",
  "Health Officer",
  "Water Supply Officer",
  "Roads & Transport Officer",
  "Survey Officer",
  "Building Inspector",
  "Revenue Officer",
  "Accounts Officer",
  "Clerk",
  "Zonal Officer",
  "Ward Officer",
  "Fire Safety Officer",
  "Public Works Officer",
  "IT Officer",
  "Other",
];

export default function Signup() {
  const navigate = useNavigate();
  // const autocompleteRef = useRef(null);
  const [role, setRole] = useState("user"); // user | admin
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    ssn: "",
    department: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleRoleChange = (_, newRole) => {
  //   if (newRole) {
  //     setRole(newRole);
  //     setForm({
  //       name: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //       ssn: "",
  //       department: "",
  //     });
  //     setFieldErrors({});
  //   }
  // };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        break;
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value) return "Confirm password is required";
        if (value !== form.password) return "Passwords do not match";
        break;
      case "ssn":
        if (role === "user" && !value) return "SSN is required";
        break;
      case "department":
        if (role === "admin" && !value) return "Department No is required";
        break;
      case "employeeId":
        if (role === "admin" && !value) return "Employee ID is required";
        if (role === "admin" && !/^[A-Za-z0-9-]+$/.test(value))
          return "Employee ID must be alphanumeric";
        break;
      case "designation":
        if (role === "admin" && !value) return "Designation is required";
        break;
      case "state":
      case "district":
      case "city":
      case "ward":
        if (role === "admin" && !value) return `${name} is required`;
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

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengths = ["Weak", "Fair", "Good", "Strong"];
    return { level: strengths[score - 1] || "", score };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (role === "user" && key === "department") return;
      if (role === "admin" && key === "ssn") return;
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
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });

      if (!res.ok) throw new Error("Failed to register");

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(form.password);

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
                  Sign Up
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
                  <TextField
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    margin="normal"
                    error={Boolean(fieldErrors.name)}
                    helperText={fieldErrors.name}
                  />
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
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    margin="normal"
                    error={Boolean(fieldErrors.password)}
                    helperText={fieldErrors.password}
                  />

                  {/* Password strength meter */}
                  {form.password && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}>
                      <Typography variant="caption">
                        Strength: {passwordStrength.level}
                      </Typography>
                      <div
                        style={{
                          height: 6,
                          borderRadius: 3,
                          background: "#eee",
                          marginTop: 4,
                          marginBottom: 8,
                        }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength.score * 25}%` }}
                          transition={{ duration: 0.4 }}
                          style={{
                            height: "100%",
                            borderRadius: 3,
                            background:
                              passwordStrength.score <= 1
                                ? "red"
                                : passwordStrength.score === 2
                                ? "orange"
                                : passwordStrength.score === 3
                                ? "gold"
                                : "green",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    margin="normal"
                    error={Boolean(fieldErrors.confirmPassword)}
                    helperText={fieldErrors.confirmPassword}
                  />

                  {/* Conditional field */}
                  {/* Conditional fields with animation */}
                  <AnimatePresence mode="wait">
                    {role === "user" ? (
                      <motion.div
                        key="user-fields"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.4 }}>
                        <TextField
                          label="SSN"
                          name="ssn"
                          value={form.ssn}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          error={Boolean(fieldErrors.ssn)}
                          helperText={fieldErrors.ssn}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="admin-fields"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}>
                        <TextField
                          label="Department No"
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          error={Boolean(fieldErrors.department)}
                          helperText={fieldErrors.department}
                        />

                        <TextField
                          label="Employee ID"
                          name="employeeId"
                          value={form.employeeId || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          error={Boolean(fieldErrors.employeeId)}
                          helperText={fieldErrors.employeeId}
                        />

                        {/* Designation Dropdown */}
                        <TextField
                          select
                          name="designation"
                          value={form.designation || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          error={Boolean(fieldErrors.designation)}
                          helperText={fieldErrors.designation}
                          SelectProps={{ native: true, displayEmpty: true }}>
                          <option value="" disabled>
                            Select Designation
                          </option>
                          {ROLES.map((pos, idx) => (
                            <option key={idx} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </TextField>

                        {/* Office Location Fields */}
                        {["state", "district", "city", "ward"].map((loc) => (
                          <TextField
                            key={loc}
                            label={
                              loc === "state"
                                ? "State"
                                : loc === "district"
                                ? "District"
                                : loc === "city"
                                ? "City / Municipality"
                                : "Ward / Zone"
                            }
                            name={loc}
                            value={form[loc] || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            margin="normal"
                            error={Boolean(fieldErrors[loc])}
                            helperText={fieldErrors[loc]}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                      "Sign Up"
                    )}
                  </Button>

                  <Divider sx={{ my: 2 }} />

                  <Typography align="center" variant="body2">
                    Already have an account?{" "}
                    <Button variant="text" onClick={() => navigate("/login")}>
                      Login
                    </Button>
                  </Typography>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}