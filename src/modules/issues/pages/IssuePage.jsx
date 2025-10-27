import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, Typography } from "@mui/material";
import IssueList from "./IssueList";
import ReportIssue from "./ReportIssue";

function IssuePage({ issues, setIssues, addIssue, filters }) {
   // Compute ranked issues instead of strict filtering
  const rankedIssues = (issues || []).map((issue) => {
    let score = 0;

    // Search matches (title, description, category, location)
    if (
      filters.search &&
      (
        issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.location.toLowerCase().includes(filters.search.toLowerCase())
      )
    ) {
      score += 2; // Stronger weight for search
    }

    // Category match
    if (filters.category && issue.category === filters.category) {
      score += 1;
    }

    // Status match
    if (filters.status && issue.status === filters.status) {
      score += 1;
    }

    // Location match
    if (
      filters.location &&
      issue.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      score += 1;
    }

    return { ...issue, score };
  });

  // Sort by score descending (higher match first), then maybe by upvotes
  const sortedIssues = rankedIssues
    .sort((a, b) => b.score - a.score || b.upvotes - a.upvotes);

  const hasIssues = sortedIssues.length > 0;

  return (
    <div className="container my-5">
      <AnimatePresence mode="wait">
        {!hasIssues ? (
          // Case: No issues after filtering → Show Empty State + ReportIssue
          <motion.div
            key="no-issues"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}>
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-sm-12">
                <Card
                  elevation={4}
                  sx={{
                    borderRadius: "16px",
                    mb: 3,
                    textAlign: "center",
                    py: 4,
                  }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}>
                      🚀 No issues found
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Be the first to raise a concern!
                    </Typography>
                  </CardContent>
                </Card>

                <ReportIssue addIssue={addIssue} />
              </div>
            </div>
          </motion.div>
        ) : (
          // Case: Issues exist → Split layout
          <motion.div
            key="with-issues"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}>
            <div className="row">
              {/* Left side - Issue list */}
              <motion.div
                className="col-lg-7 col-md-12 mb-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                <IssueList issues={sortedIssues} setIssues={setIssues} />
              </motion.div>

              {/* Right side - Report form */}
              <motion.div
                className="col-lg-5 col-md-12"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <ReportIssue addIssue={addIssue} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default IssuePage;
