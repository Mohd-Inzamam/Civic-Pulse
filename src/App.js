import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IssuePage from "./pages/IssuePage";
import IssueDetail from "./pages/IssueDetail";
import Dashboard from "./modules/pages/Dashboard";
import { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css"

const dummyIssues = [];

function App() {
  const [issues, setIssues] = useState(dummyIssues);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    location: ""
  });


  // Function to add a new issue
  const addIssue = (newIssue) => {
    const issueWithId = { ...newIssue, id: Date.now().toString(), upvotes: 0 }; // add upvotes field
    setIssues([...issues, issueWithId]);
  };

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
            <IssuePage issues={issues} setIssues={setIssues} addIssue={addIssue} filters={filters} />
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
