import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IssuePage from "./pages/IssuePage";  // ✅ note plural spelling
import IssueDetail from "./pages/IssueDetail"; // ✅ placeholder for Brick 3
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


const dummyIssues = [];

function App() {
  const [issues, setIssues] = useState(dummyIssues);

  // Function to add a new issue
  const addIssue = (newIssue) => {
    const issueWithId = { ...newIssue, id: Date.now().toString() }; // unique id
    setIssues([...issues, issueWithId]);
  };


  // const updateIssueStatus = (id, newStatus) => {
  //   setIssues(prev =>
  //     prev.map(issue => issue.id === id ? { ...issue, status: newStatus } : issue)
  //   );
  // };

  const handleStatusChange = (id, newStatus) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
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
        <Route path="/issues/:id" element={<IssueDetail issues={issues} />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard issues={issues} updateIssueStatus={handleStatusChange} />} />

        {/* Sign up page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login up page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
