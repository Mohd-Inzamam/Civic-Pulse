// App.js
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IssuePage from "./modules/issues/pages/IssuePage";
import IssueDetail from "./modules/issues/pages/IssueDetail";
import Dashboard from "./modules/dashboard/pages/Dashboard";
import { useState } from "react";
import Signup from "./modules/auth/pages/Signup";
import Login from "./modules/auth/pages/Login";

const dummyIssues = [
  // Example dummy issues (optional, remove if you want empty state at start)
  {
    id: "1",
    title: "Pothole on Main Road",
    description: "Large pothole causing traffic",
    category: "Roads",
    status: "Open",
    createdBy: "John Doe",
    upvotes: 0,
    createdAt: new Date("2025-01-10").toISOString(),
  },
  {
    id: "2",
    title: "Streetlight not working",
    description: "Lamp post near park is out",
    category: "Electricity",
    status: "In Progress",
    createdBy: "Jane Smith",
    upvotes: 0,
    createdAt: new Date("2025-02-15").toISOString(),
  },
  {
    id: "3",
    title: "Overflowing garbage bin",
    description: "Waste not collected for 3 days",
    category: "Waste",
    status: "Resolved",
    createdBy: "Ravi Kumar",
    upvotes: 0,
    createdAt: new Date("2025-03-20").toISOString(),
  },
];

function App() {
  const [issues, setIssues] = useState(dummyIssues);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    location: "",
  });

  // Function to add a new issue
  const addIssue = (newIssue) => {
    const issueWithId = {
      ...newIssue,
      id: Date.now().toString(),
      upvotes: 0,
      status: newIssue.status || "Open", // default status
      createdAt: new Date().toISOString(), // 👈 needed for LineChart
    };
    setIssues([...issues, issueWithId]);
  };

  // Update issue status
  const handleStatusChange = (id, newStatus) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  return (
    <div className="App">
      <Navbar setFilters={setFilters} />

      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={<h2 className="text-center mt-5">Welcome to CivicPulse</h2>}
        />

        {/* Issues Page */}
        <Route
          path="/issues"
          element={
            <IssuePage
              issues={issues}
              setIssues={setIssues}
              addIssue={addIssue}
              filters={filters}
            />
          }
        />

        {/* Issue Details Page */}
        <Route
          path="/issues/:id"
          element={<IssueDetail issues={issues} setIssues={setIssues} />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard issues={issues} updateIssueStatus={handleStatusChange} />
          }
        />

        {/* Sign up page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
