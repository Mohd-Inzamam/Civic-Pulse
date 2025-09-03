import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { CheckCircle } from "@mui/icons-material";
// Import your Google handler (reused from Navbar/Auth context)
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");
    const { email, password } = form;
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Server returned non-JSON response");
      }
    } catch (err) {
      setApiError("Something went wrong. Please try again.");
      return;
    }

    if (!res.ok) {
      setApiError(data?.message || "Invalid credentials");
      return;
    }

    // success
    localStorage.setItem("token", data.token);
    setSuccess(true);
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <Card className="shadow-lg rounded-4">
              <CardContent className="p-4">
                <Typography variant="h5" align="center" gutterBottom>
                  Login
                </Typography>

                {/* Google Login */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FcGoogle />}
                    onClick={loginWithGoogle}
                    sx={{ mb: 2, textTransform: "none", bgcolor: "white" }}>
                    Sign in with Google
                  </Button>
                </motion.div>

                <Divider sx={{ my: 2 }}>or sign in with email</Divider>

                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={
                      <AnimatePresence>
                        {errors.email && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}>
                            {errors.email}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    }
                  />

                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={
                      <AnimatePresence>
                        {errors.password && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}>
                            {errors.password}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    }
                  />

                  {/* API Error */}
                  <AnimatePresence>
                    {apiError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}>
                        <Typography
                          color="error"
                          variant="body2"
                          align="center"
                          sx={{ mt: 1 }}>
                          {apiError}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Success */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center mt-2">
                        <CheckCircle color="success" fontSize="large" />
                        <Typography color="green">Login successful!</Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, borderRadius: 3 }}
                    disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Login"}
                  </Button>

                  <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don’t have an account?{" "}
                    <RouterLink to="/signup">Sign up</RouterLink>
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
