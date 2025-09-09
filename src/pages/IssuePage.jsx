import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, Typography } from "@mui/material";
import IssueList from "./IssueList";
import ReportIssue from "./ReportIssue";

function IssuePage({ issues, setIssues, addIssue, filters }) {
  // 🔑 Apply filters here
  const filteredIssues = (issues || []).filter((issue) => {
    const matchesSearch =
      !filters.search ||
      issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      issue.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      !filters.category || issue.category === filters.category;

    const matchesStatus = !filters.status || issue.status === filters.status;

    const matchesLocation =
      !filters.location ||
      issue.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const hasIssues = filteredIssues.length > 0;

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
                <IssueList issues={filteredIssues} setIssues={setIssues} />
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

// import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent, Typography } from "@mui/material";
// import IssueList from "./IssueList";
// import ReportIssue from "./ReportIssue";

// function IssuePage({ issues, setIssues, addIssue, filters }) {
//   const hasIssues = issues && issues.length > 0;

//   // 🔑 Apply filters here
//   const filteredIssues = (issues || []).filter((issue) => {
//     const matchesSearch =
//       !filters.search ||
//       issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//       issue.description.toLowerCase().includes(filters.search.toLowerCase());

//     const matchesCategory =
//       !filters.category || issue.category === filters.category;

//     const matchesStatus = !filters.status || issue.status === filters.status;

//     const matchesLocation =
//       !filters.location ||
//       issue.location.toLowerCase().includes(filters.location.toLowerCase());

//     return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
//   });

//   return (
//     <div className="container my-5">
//       <AnimatePresence mode="wait">
//         {!hasIssues ? (
//           // Case: No issues yet → Show Empty State + ReportIssue
//           <motion.div
//             key="no-issues"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -40 }}
//             transition={{ duration: 0.5 }}>
//             <div className="row justify-content-center">
//               <div className="col-lg-8 col-md-10 col-sm-12">
//                 <Card
//                   elevation={4}
//                   sx={{
//                     borderRadius: "16px",
//                     mb: 3,
//                     textAlign: "center",
//                     py: 4,
//                   }}>
//                   <CardContent>
//                     <Typography
//                       variant="h5"
//                       color="textSecondary"
//                       gutterBottom
//                       sx={{ fontWeight: "bold" }}>
//                       🚀 No issues reported yet
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Be the first to raise a concern for your community!
//                     </Typography>
//                   </CardContent>
//                 </Card>

//                 <ReportIssue addIssue={addIssue} />
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           // Case: Issues exist → Split layout
//           <motion.div
//             key="with-issues"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -40 }}
//             transition={{ duration: 0.5 }}>
//             <div className="row">
//               {/* Left side - Issue list */}
//               <motion.div
//                 className="col-lg-7 col-md-12 mb-3"
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}>
//                 {/* ✅ Pass only filtered issues */}
//                 <IssueList issues={filteredIssues} setIssues={setIssues} />
//               </motion.div>

//               {/* Right side - Report form */}
//               <motion.div
//                 className="col-lg-5 col-md-12"
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}>
//                 <ReportIssue addIssue={addIssue} />
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default IssuePage;
