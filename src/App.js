import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IssuePage from "./pages/IssuePage";  // ✅ note plural spelling
import IssueDetail from "./pages/IssueDetail"; // ✅ placeholder for Brick 3
import Dashboard from "./pages/Dashboard";
import { dummyIssues as initialIssues } from "./mockData";
import { useState } from "react";


function App() {
  const [issues, setIssues] = useState(initialIssues);

  // Function to add a new issue
  const addIssue = (newIssue) => {
    setIssues([...issues, newIssue]);
  };

  const updateIssueStatus = (id, newStatus) => {
    setIssues(prev =>
      prev.map(issue => issue.id === id ? { ...issue, status: newStatus } : issue)
    );
  };

  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Home route (just placeholder for now) */}
        <Route path="/" element={<h2 className="text-center mt-5">Welcome to CivicPulse</h2>} />

        {/* Issues Page */}
        <Route path="/issues" element={<IssuePage issues={issues} addIssue={addIssue} />} />

        {/* Issue Details Page */}
        <Route path="/issues/:id" element={<IssueDetail />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard issues={issues} updateIssueStatus={updateIssueStatus} />} />
      </Routes>
    </div>
  );
}

export default App;
