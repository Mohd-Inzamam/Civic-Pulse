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
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../context/AuthContext"; // assuming Google auth handler is here

export default function Signup() {
  const navigate = useNavigate();
  const { handleGoogleAuth } = useAuth(); // reuse existing Google auth handler

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      default:
        return null;
    }
    return null;
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

  const [fieldErrors, setFieldErrors] = useState({});

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach((key) => {
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
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

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

                {/* Google Sign Up Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleAuth}
                    sx={{
                      mb: 2,
                      py: 1,
                      textTransform: "none",
                      borderRadius: "12px",
                      fontWeight: 500,
                      bgcolor: "white",
                    }}>
                    Sign up with Google
                  </Button>
                </motion.div>

                <Divider sx={{ mb: 2 }}>or sign up with email</Divider>

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

                  <Typography align="center" variant="body2" sx={{ mt: 2 }}>
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
// import {
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   CircularProgress,
//   LinearProgress,
// } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// export default function Signup() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [strength, setStrength] = useState(0);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });

//     if (name === "password") {
//       checkStrength(value);
//     }
//   };

//   const checkStrength = (password) => {
//     let score = 0;
//     if (password.length >= 6) score += 25;
//     if (/[A-Z]/.test(password)) score += 25;
//     if (/[0-9]/.test(password)) score += 25;
//     if (/[^A-Za-z0-9]/.test(password)) score += 25;
//     setStrength(score);
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.name) newErrors.name = "Name is required";
//     if (!form.email) newErrors.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!form.password) newErrors.password = "Password is required";
//     else if (form.password.length < 6)
//       newErrors.password = "Password should be at least 6 characters";

//     if (!form.confirmPassword)
//       newErrors.confirmPassword = "Please confirm your password";
//     else if (form.password !== form.confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match";

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setErrors({});
//     setLoading(true);

//     try {
//       const res = await fetch("/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to register");
//       }

//       setSuccess(true);
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (err) {
//       setErrors({ api: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStrengthLabel = () => {
//     if (strength === 0) return "";
//     if (strength <= 25) return "Weak";
//     if (strength <= 50) return "Fair";
//     if (strength <= 75) return "Good";
//     return "Strong";
//   };

//   const getStrengthColor = () => {
//     if (strength === 0) return "inherit";
//     if (strength <= 25) return "error";
//     if (strength <= 50) return "warning";
//     if (strength <= 75) return "info";
//     return "success";
//   };

//   const MotionHelperText = ({ error }) => (
//     <AnimatePresence mode="wait">
//       {error && (
//         <motion.div
//           initial={{ opacity: 0, y: -5 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -5 }}
//           transition={{ duration: 0.2 }}>
//           <Typography variant="caption" color="error">
//             {error}
//           </Typography>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col xs={12} md={6} lg={5}>
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}>
//             <Card className="shadow-lg rounded-4">
//               <CardContent className="p-4">
//                 <Typography
//                   variant="h4"
//                   align="center"
//                   gutterBottom
//                   sx={{ fontWeight: "bold" }}>
//                   Sign Up
//                 </Typography>

//                 <AnimatePresence>
//                   {errors.api && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.3 }}>
//                       <Alert severity="error" className="mb-3">
//                         {errors.api}
//                       </Alert>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <AnimatePresence>
//                   {success && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.8 }}
//                       transition={{ duration: 0.4 }}
//                       className="mb-3 text-center">
//                       <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
//                       <Typography
//                         variant="h6"
//                         color="success.main"
//                         sx={{ mt: 1 }}>
//                         Account Created!
//                       </Typography>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <form onSubmit={handleSubmit} noValidate>
//                   <TextField
//                     label="Full Name"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                     error={!!errors.name}
//                   />
//                   <MotionHelperText error={errors.name} />

//                   <TextField
//                     label="Email"
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                     error={!!errors.email}
//                   />
//                   <MotionHelperText error={errors.email} />

//                   <TextField
//                     label="Password"
//                     type="password"
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                     error={!!errors.password}
//                   />
//                   <MotionHelperText error={errors.password} />

//                   {form.password && (
//                     <div className="mt-2">
//                       <LinearProgress
//                         variant="determinate"
//                         value={strength}
//                         color={getStrengthColor()}
//                         sx={{ borderRadius: "8px", height: 8 }}
//                       />
//                       <Typography
//                         variant="body2"
//                         sx={{ mt: 1, fontWeight: "medium", textAlign: "right" }}
//                         color={getStrengthColor()}>
//                         {getStrengthLabel()}
//                       </Typography>
//                     </div>
//                   )}

//                   <TextField
//                     label="Confirm Password"
//                     type="password"
//                     name="confirmPassword"
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                     error={!!errors.confirmPassword}
//                   />
//                   <MotionHelperText error={errors.confirmPassword} />

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     sx={{ mt: 2, py: 1.2, borderRadius: "12px" }}
//                     disabled={loading || success}>
//                     {loading ? (
//                       <CircularProgress size={24} color="inherit" />
//                     ) : (
//                       "Sign Up"
//                     )}
//                   </Button>

//                   <Typography align="center" variant="body2" sx={{ mt: 2 }}>
//                     Already have an account?{" "}
//                     <Button variant="text" onClick={() => navigate("/login")}>
//                       Login
//                     </Button>
//                   </Typography>
//                 </form>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
