import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IssuePage from "./pages/IssuePage";  // ✅ note plural spelling
import IssueDetail from "./pages/IssueDetail"; // ✅ placeholder for Brick 3

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Home route (just placeholder for now) */}
        <Route path="/" element={<h2 className="text-center mt-5">Welcome to CivicPulse</h2>} />

        {/* Issues Page */}
        <Route path="/issues" element={<IssuePage />} />

        {/* Issue Details Page */}
        <Route path="/issues/:id" element={<IssueDetail />} />
      </Routes>
    </div>
  );
}

export default App;
