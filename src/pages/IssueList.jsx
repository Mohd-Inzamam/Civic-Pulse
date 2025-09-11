import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function IssueList({ issues, setIssues }) {
  const navigate = useNavigate();
  const [votedIssues, setVotedIssues] = useState([]);

  // Load voted issues from localStorage on mount
  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votedIssues")) || [];
    setVotedIssues(storedVotes);
  }, []);

  // Handle upvote click
  const handleUpvote = (id) => {
    if (votedIssues.includes(id)) return;

    // update issues state
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, upvotes: issue.upvotes + 1 } : issue
      )
    );

    // update votedIssues state + persist to localStorage
    const updatedVotes = [...votedIssues, id];
    setVotedIssues(updatedVotes);
    localStorage.setItem("votedIssues", JSON.stringify(updatedVotes));
  };

  return (
    <div>
      <h2 className="fw-bold text-primary mb-4">Reported Issues</h2>

      {issues.length === 0 ? (
        // 🚨 Empty state when filters remove everything
        <div className="alert alert-info rounded-4 shadow-sm">
          <strong>No issues match your filters.</strong>
          <br />
          Try adjusting search, category, or status filters.
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="card shadow-sm border-0 rounded-4 overflow-hidden">
              {issue.imageURL && (
                <img
                  src={issue.imageURL}
                  alt={issue.title}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title fw-bold">{issue.title}</h5>
                <p className="card-text text-muted">{issue.description}</p>

                <div className="mb-2">
                  <span className="badge bg-info me-2">{issue.category}</span>
                  <span
                    className={`badge ${
                      issue.status === "Open"
                        ? "bg-danger"
                        : issue.status === "In Progress"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}>
                    {issue.status}
                  </span>
                  <br />
                  {issue.id && (
                    <button
                      className="btn btn-primary btn-sm mt-2"
                      onClick={() => navigate(`/issues/${issue.id}`)}>
                      View Details
                    </button>
                  )}
                </div>

                <p className="mb-1">
                  📍 <strong>Location:</strong> {issue.location}
                </p>
                <p className="mb-1">
                  👤 <strong>Created By:</strong> {issue.createdBy}
                </p>

                {/* Upvote section */}
                <div className="d-flex align-items-center mt-2">
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    disabled={votedIssues.includes(issue.id)}
                    onClick={() => handleUpvote(issue.id)}>
                    👍 {votedIssues.includes(issue.id) ? "Voted" : "Upvote"}
                  </button>
                  <span className="fw-bold"> {issue.upvotes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IssueList;
