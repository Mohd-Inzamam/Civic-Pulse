import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Typography, Alert, Divider, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Import reusable components
import FormField from "../../../components/common/FormField";
import PasswordField from "../../../components/common/PasswordField";
import SelectField from "../../../components/common/SelectField";
import SubmitButton from "../../../components/common/SubmitButton";
import RoleToggle from "../../../components/common/RoleToggle";
import PageCard from "../../../components/common/PageCard";
import PasswordStrengthIndicator from "../../../components/common/PasswordStrengthIndicator";

// Import API configuration
import { API_ENDPOINTS } from "../../../config/api";

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
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    ssn: "",
    department: "",
    employeeId: "",
    designation: "",
    state: "",
    district: "",
    city: "",
    ward: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      const res = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, role }),
      });

      if (!res.ok) throw new Error("Failed to register");

      setSuccess(
        "Signup successful! Please check your email to verify your account."
      );
      setTimeout(() => navigate("/verify-email"), 1800);
    } catch (err) {
      console.log("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = ROLES.map((role) => ({ value: role, label: role }));

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <PageCard title="Sign Up">
            {/* Role toggle */}
            <div className="mb-3">
              <RoleToggle value={role} onChange={setRole} />
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
              <FormField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldErrors.name}
                animationDelay={0.1}
              />

              <FormField
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldErrors.email}
                animationDelay={0.2}
              />

              <PasswordField
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldErrors.password}
                animationDelay={0.3}
              />

              <PasswordStrengthIndicator password={form.password} />

              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldErrors.confirmPassword}
                animationDelay={0.4}
              />

              {/* Conditional fields */}
              <AnimatePresence mode="wait">
                {role === "user" ? (
                  <motion.div
                    key="user-fields"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}>
                    <FormField
                      label="SSN"
                      name="ssn"
                      value={form.ssn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={fieldErrors.ssn}
                      animationDelay={0.5}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="admin-fields"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}>
                    <FormField
                      label="Department No"
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={fieldErrors.department}
                      animationDelay={0.5}
                    />

                    <FormField
                      label="Employee ID"
                      name="employeeId"
                      value={form.employeeId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={fieldErrors.employeeId}
                      animationDelay={0.6}
                    />

                    <SelectField
                      label="Designation"
                      name="designation"
                      value={form.designation || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={fieldErrors.designation}
                      options={roleOptions}
                      placeholder="Select Designation"
                      animationDelay={0.7}
                    />

                    {/* Office Location Fields */}
                    {["state", "district", "city", "ward"].map((loc, index) => (
                      <FormField
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
                        error={fieldErrors[loc]}
                        animationDelay={0.8 + index * 0.1}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <SubmitButton
                loading={loading}
                animationDelay={role === "admin" ? 1.2 : 0.6}>
                Sign Up
              </SubmitButton>

              <Divider sx={{ my: 2 }} />

              <Typography align="center" variant="body2">
                Already have an account?{" "}
                <Button variant="text" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </Typography>
            </form>
          </PageCard>
        </Col>
      </Row>
    </Container>
  );
}
