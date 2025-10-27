import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SummaryCards from "../components/SummaryCards";
import DashboardCharts from "../components/DashboardCharts";
import IssuesTable from "../components/IssuesTable";

const Dashboard = ({ issues, updateIssueStatus }) => {
  const [changedId, setChangedId] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    if (updateIssueStatus) {
      updateIssueStatus(id, newStatus);
      setChangedId(id);
      setTimeout(() => setChangedId(null), 800);
    }
  };

  // Summary calculations
  const total = issues.length;
  const openCount = issues.filter((i) => i.status === "Open").length;
  const inProgressCount = issues.filter((i) => i.status === "In Progress").length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;

  const summary = [
    { label: "Total Issues", count: total, color: "primary" },
    { label: "Open", count: openCount, color: "error" },
    { label: "In Progress", count: inProgressCount, color: "warning" },
    { label: "Resolved", count: resolvedCount, color: "success" },
  ];

  return (
    <Container fluid className="mt-4" sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col md={10}>
          <SummaryCards summary={summary} />
          <DashboardCharts issues={issues} />
          <IssuesTable issues={issues} handleStatusChange={handleStatusChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;