import { useState } from "react";

function ReportIssue({ addIssue }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageURL: "",
    location: "",
    status: "open",
    upvotes: 0,
    createdBy: "",
  });

  const [errors, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "upvotes" ? Math.max(0, Number(value)) : value,
    });
    // console.log(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.title || formData.title.length < 5) {
      newErrors.title = "Title must atleast 5 chcracters!";
      console.log(newErrors.title);
    }

    if (!formData.description || formData.description.length < 15) {
      newErrors.description = "Description must atleast 15 chcracters!";
      console.log(newErrors.description);
    }

    if (!formData.category) {
      newErrors.category = "Please select the category";
      console.log(newErrors.category);
    }

    if (formData.imageURL && !/^https?:\/\/.+\..+/.test(formData.imageURL)) {
      newErrors.imageURL = "Please enter a valid URL";
      console.log(newErrors.imageURL);
    }

    if (!formData.location || formData.location.length < 3) {
      newErrors.location = "Location must be at least 3 characters long";
      console.log(newErrors.location);
    }

    if (
      formData.status &&
      !["Open", "In Progress", "Resolved"].includes(formData.status)
    ) {
      newErrors.status = "Invalid status";
      console.log(newErrors.status);
    }

    if (formData.upvotes < 0) {
      newErrors.upvotes = "Upvotes cannot be negative";
      console.log(newErrors.upvotes);
    }

    if (!formData.createdBy) {
      newErrors.createdBy = "Created By is required";
      console.log(newErrors.createdBy);
    }

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation Errors:", newErrors);
      return;
    }

    console.log("Form Data Submitted:", formData);

    //  Adding this line to push the new issue
    addIssue({ ...formData, id: Date.now() });

    // Reset the form
    setFormData({
      title: "",
      description: "",
      category: "",
      imageURL: "",
      location: "",
      status: "open",
      upvotes: 0,
      createdBy: "",
    });
  };
  return (
    <div
      className="card shadow-lg border-0 rounded-4 p-4 sticky-top"
      style={{ top: "80px" }}>
      <h3 className="card-title text-center mb-4 text-primary fw-bold">
        Report an Issue
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="text-danger small">{errors.title}</div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}></textarea>
          {errors.description && (
            <div className="text-danger small">{errors.description}</div>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Category</label>
          <select
            className={`form-select ${errors.category ? "is-invalid" : ""}`}
            name="category"
            value={formData.category}
            onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <div className="text-danger small">{errors.category}</div>
          )}
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Image</label>
          <input
            type="url"
            className={`form-control ${errors.imageURL ? "is-invalid" : ""}`}
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
          {errors.imageURL && (
            <div className="text-danger small">{errors.imageURL}</div>
          )}
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Location</label>
          <input
            type="text"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && (
            <div className="text-danger small">{errors.location}</div>
          )}
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Status</label>
          <input
            className={`form-control ${errors.status ? "is-invalid" : ""}`}
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
          {errors.status && (
            <div className="text-danger small">{errors.status}</div>
          )}
        </div>

        {/* Upvotes */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Upvotes</label>
          <input
            type="number"
            className={`form-control ${errors.upvotes ? "is-invalid" : ""}`}
            name="upvotes"
            value={formData.upvotes}
            onChange={handleChange}
            min="0"
            disabled // 🔒 will be auto-handled later
          />
          {errors.upvotes && (
            <div className="text-danger small">{errors.upvotes}</div>
          )}
        </div>

        {/* Created By */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Created By</label>
          <input
            type="text"
            className={`form-control ${errors.createdBy ? "is-invalid" : ""}`}
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
          />
          {errors.createdBy && (
            <div className="text-danger small">{errors.createdBy}</div>
          )}
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary fw-semibold">
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportIssue;
