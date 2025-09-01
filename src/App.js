import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IssuePage from "./pages/IssuePage";  // ✅ note plural spelling
import IssueDetail from "./pages/IssueDetail"; // ✅ placeholder for Brick 3
import Dashboard from "./pages/Dashboard";
import { dummyIssues as initialIssues } from "./mockData";
import { useState } from "react";
import Signup from "./pages/Signup";


function App() {
  const [issues, setIssues] = useState(initialIssues);

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

        {/* Dashboard */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;


/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwhtTkkHN_xY8MeQOJ02OIHwmPpXQe-zE",
  authDomain: "civicpulse-81cde.firebaseapp.com",
  projectId: "civicpulse-81cde",
  storageBucket: "civicpulse-81cde.firebasestorage.app",
  messagingSenderId: "390676202124",
  appId: "1:390676202124:web:846b24f1097c16000031a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);*/