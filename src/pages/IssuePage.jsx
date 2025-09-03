import IssueList from "./IssueList";
import ReportIssue from "./ReportIssue";
import { motion } from "framer-motion";

function IssuePage({ issues, addIssue }) {
  return (
    <div className="container my-5">
      <div className="row g-4 align-items-start">
        {/* Left side - Issue list */}
        <div className="col-lg-7 col-md-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <IssueList issues={issues} />
          </motion.div>
        </div>

        {/* Right side - Report issue form */}
        <div className="col-lg-5 col-md-12">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <ReportIssue addIssue={addIssue} />
          </motion.div>
        </div>
      </div>
      <ReportIssue />
    </div>
  );
}

export default IssuePage;

// import IssueList from "./IssueList";
// import ReportIssue from "./ReportIssue";

// function IssuePage({ issues, addIssue }) {
//   return (
//     <div className="container my-5">
//       <div className="row">
//         {/* Left side - Issue list */}
//         <div className="col-lg-7 col-md-12 mb-3">
//           <IssueList issues={issues} />
//         </div>

//         {/* Right side - Report issue form */}
//         <div className="col-lg-5 col-md-12 mb-3">
//           <ReportIssue addIssue={addIssue} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default IssuePage;
// // col-lg-8 col-md-7 col-sm-12 || col-lg-4 col-md-5 col-sm-12
