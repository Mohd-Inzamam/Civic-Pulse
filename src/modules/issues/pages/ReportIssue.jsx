import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { PhotoCamera } from "@mui/icons-material";

function ReportIssue({ addIssue }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "Open",
    upvotes: 0,
    createdBy: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "upvotes" ? Math.max(0, Number(value)) : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.title || formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters!";
    }
    if (!formData.description || formData.description.length < 15) {
      newErrors.description = "Description must be at least 15 characters!";
    }
    if (!formData.category) {
      newErrors.category = "Please select the category";
    }
    if (!imageFile) {
      newErrors.image = "Please upload an image";
    }
    if (!formData.location || formData.location.length < 3) {
      newErrors.location = "Location must be at least 3 characters long";
    }
    if (
      formData.status &&
      !["Open", "In Progress", "Resolved"].includes(formData.status)
    ) {
      newErrors.status = "Invalid status";
    }
    if (formData.upvotes < 0) {
      newErrors.upvotes = "Upvotes cannot be negative";
    }
    if (!formData.createdBy) {
      newErrors.createdBy = "Created By is required";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    addIssue({ ...formData, image: preview, imageFile, id: Date.now() });

    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      status: "Open",
      upvotes: 0,
      createdBy: "",
    });
    setImageFile(null);
    setPreview(null);
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "30px" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <Card
          elevation={6}
          sx={{
            borderRadius: "20px",
            mt: 3,
            maxWidth: 700,
            mx: "auto",
            p: 3,
          }}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              color="primary"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 3 }}>
              Report an Issue
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Title - full width */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                  />
                </Grid>

                {/* Description - full width */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </Grid>

                {/* Category + Location side by side */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}>
                      <MenuItem value="">Select Category</MenuItem>
                      <MenuItem value="Road">Road</MenuItem>
                      <MenuItem value="Electricity">Electricity</MenuItem>
                      <MenuItem value="Water">Water</MenuItem>
                      <MenuItem value="Garbage">Garbage</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <FormHelperText>{errors.category}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    error={!!errors.location}
                    helperText={errors.location}
                  />
                </Grid>

                {/* Image Upload - full width */}
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<PhotoCamera />}
                    sx={{
                      py: 1.5,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}>
                    {imageFile ? "Change Image" : "Upload Image"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {errors.image && (
                    <FormHelperText error>{errors.image}</FormHelperText>
                  )}
                </Grid>

                {/* Image Preview - full width */}
                {preview && (
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: 2,
                      }}>
                      <img
                        src={preview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxHeight: "250px",
                          objectFit: "cover",
                        }}
                      />
                    </Card>
                  </Grid>
                )}

                {/* Status + Upvotes side by side */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    error={!!errors.status}
                    helperText={errors.status}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Upvotes"
                    name="upvotes"
                    value={formData.upvotes}
                    onChange={handleChange}
                    disabled
                    helperText="Upvotes will be auto-handled later"
                  />
                </Grid>

                {/* Created By - full width */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Created By"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleChange}
                    error={!!errors.createdBy}
                    helperText={errors.createdBy}
                  />
                </Grid>

                {/* Submit Button - full width */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: "bold",
                      borderRadius: "10px",
                      textTransform: "none",
                      background:
                        "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
                    }}>
                    Submit Issue
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default ReportIssue;