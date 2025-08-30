// Dashboard.jsx
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Grow,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Function to map status to MUI color
const getStatusColor = (status) => {
  switch (status) {
    case "Open":
      return { color: "error", label: "Open" };
    case "In Progress":
      return { color: "warning", label: "In Progress" };
    case "Resolved":
      return { color: "success", label: "Resolved" };
    default:
      return { color: "default", label: status };
  }
};

const Dashboard = ({ issues, updateIssueStatus }) => {
  const [changedId, setChangedId] = useState(null); // Track last changed row

  const handleStatusChange = (id, newStatus) => {
    if (updateIssueStatus) {
      updateIssueStatus(id, newStatus); // Call App.js handler
      setChangedId(id);
      setTimeout(() => setChangedId(null), 800);
    }
  };

  // Summary
  const total = issues.length;
  const openCount = issues.filter((i) => i.status === "Open").length;
  const inProgressCount = issues.filter(
    (i) => i.status === "In Progress"
  ).length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;

  const summary = [
    { label: "Total Issues", count: total, color: "primary" },
    { label: "Open", count: openCount, color: "error" },
    { label: "In Progress", count: inProgressCount, color: "warning" },
    { label: "Resolved", count: resolvedCount, color: "success" },
  ];

  return (
    <Container fluid className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          {/* Summary Cards */}
          <Row className="mb-4">
            {summary.map((item, index) => (
              <Col md={3} sm={6} xs={12} key={item.label} className="mb-3">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}>
                  <Card
                    sx={{ boxShadow: 3, borderRadius: 3, textAlign: "center" }}>
                    <CardContent>
                      <Typography variant="h6">{item.label}</Typography>
                      <Typography
                        variant="h4"
                        color={item.color}
                        fontWeight="bold">
                        {item.count}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Issues Table */}
          <Grow in timeout={800}>
            <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  component={motion.div}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}>
                  Admin Dashboard
                </Typography>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>ID</b>
                        </TableCell>
                        <TableCell>
                          <b>Issue</b>
                        </TableCell>
                        <TableCell>
                          <b>Reporter</b>
                        </TableCell>
                        <TableCell>
                          <b>Status</b>
                        </TableCell>
                        <TableCell>
                          <b>Update Status</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {issues.map((issue, index) => (
                        <motion.tr
                          key={issue.id}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0px 5px 10px rgba(0,0,0,0.12)",
                          }}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.2 }}>
                          <TableCell>{issue.id}</TableCell>
                          <TableCell>{issue.title}</TableCell>
                          <TableCell>
                            {issue.createdBy || issue.reporter}
                          </TableCell>
                          <TableCell>
                            <AnimatePresence>
                              <motion.div
                                key={
                                  changedId === issue.id
                                    ? "changed"
                                    : issue.status
                                }
                                initial={{ scale: 1, opacity: 0 }}
                                animate={{ scale: 1.1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3 }}>
                                <Chip
                                  label={getStatusColor(issue.status).label}
                                  color={getStatusColor(issue.status).color}
                                  variant="filled"
                                  sx={{ fontWeight: "bold" }}
                                />
                              </motion.div>
                            </AnimatePresence>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={issue.status}
                              onChange={(e) =>
                                handleStatusChange(issue.id, e.target.value)
                              }
                              size="small"
                              sx={{
                                background: "#f5f5f5",
                                borderRadius: "8px",
                                minWidth: "140px",
                              }}>
                              <MenuItem value="Open">Open</MenuItem>
                              <MenuItem value="In Progress">
                                In Progress
                              </MenuItem>
                              <MenuItem value="Resolved">Resolved</MenuItem>
                            </Select>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grow>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
