import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
// import { dummyIssues } from "../mockData";

// Mock data (later replace with API)
// const mockIssues = [
//   {
//     id: "1",
//     title: "Potholes on Main Street",
//     description: "Large potholes causing traffic jams and accidents.",
//     location: "Main Street, Sector 12",
//     category: "Road",
//     status: "Open",
//     image: "https://via.placeholder.com/600x300",
//   },
//   {
//     id: "2",
//     title: "Broken Streetlight",
//     description: "Streetlight not working in Park Avenue area.",
//     location: "Park Avenue, Block A",
//     category: "Electricity",
//     status: "In Progress",
//     image:
//       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fbroken-street-light&psig=AOvVaw2m58A17uWVKC2dTfqXs_eR&ust=1756570223758000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNjC9o-0sI8DFQAAAAAdAAAAABAE",
//   },
// ];

function IssueDetail({ issues }) {
  const { id } = useParams();
  const issue = issues.find((item) => String(item.id) === id);

  if (!issue) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" color="error">
                ❌ Issue not found
              </Typography>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardMedia
              component="img"
              height="300"
              image={issue.image}
              alt={issue.title}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {issue.title}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                {issue.description}
              </Typography>

              <Row className="mt-3">
                <Col sm={6}>
                  <Typography variant="subtitle1">
                    📍 <b>Location:</b> {issue.location}
                  </Typography>
                </Col>
                <Col sm={6}>
                  <Typography variant="subtitle1">
                    🏷 <b>Category:</b>{" "}
                    <Chip label={issue.category} color="primary" />
                  </Typography>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Typography variant="subtitle1">
                    ✅ <b>Status:</b>{" "}
                    <Chip
                      label={issue.status}
                      color={
                        issue.status === "Open"
                          ? "error"
                          : issue.status === "In Progress"
                          ? "warning"
                          : "success"
                      }
                    />
                  </Typography>
                </Col>
              </Row>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default IssueDetail;
