import { useEffect, useState } from "react";

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyIssues = [
    {
      id: 1,
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues.",
      status: "Open",
    },
    {
      id: 2,
      title: "Street Light Not Working",
      description: "The street light near park has been out for a week.",
      status: "In Progress",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIssues(dummyIssues);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }
  return (
    <div>
      <h2 className="fw-bold text-primary mb-4">Reported Issues</h2>
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
              </div>

              <p className="mb-1">
                📍 <strong>Location:</strong> {issue.location}
              </p>
              <p className="mb-1">
                👤 <strong>Created By:</strong> {issue.createdBy}
              </p>
              <p className="mb-0">👍 Upvotes: {issue.upvotes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IssueList;
