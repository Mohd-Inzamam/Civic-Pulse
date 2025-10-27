// PieChartIssues.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Box } from "@mui/material";

const COLORS = ["#1976d2", "#2e7d32", "#ed6c02", "#d32f2f", "#7b1fa2"];

export default function PieChartIssues({ issues = [] }) {
  // Compute counts per category
  const categoryCounts = issues.reduce((acc, issue) => {
    const cat = issue.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    value: categoryCounts[cat],
  }));

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Issues by Category
          </Typography>
          <Box sx={{ position: "relative", width: "100%", height: 250 }}>
            {/* Center total */}
            <Typography
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#555",
              }}
            >
              {total} Total
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  label
                  cornerRadius={5}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      style={{
                        transition: "all 0.3s",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                    padding: "8px 12px",
                  }}
                  itemStyle={{ color: "#555", fontWeight: "bold" }}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "0.9rem", color: "#555" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}



// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { motion } from "framer-motion";
// import { Card, CardContent, Typography, Box } from "@mui/material";

// const data = [
//   { name: "Roads", value: 40 },
//   { name: "Water", value: 30 },
//   { name: "Electricity", value: 20 },
//   { name: "Waste", value: 10 },
// ];

// const COLORS = ["#1976d2", "#2e7d32", "#ed6c02", "#d32f2f"];

// export default function PieChartIssues() {
//   const total = data.reduce((sum, entry) => sum + entry.value, 0);

//   return (
//     <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
//       <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Issues by Category
//           </Typography>
//           <Box sx={{ position: "relative", width: "100%", height: 250 }}>
//             {/* Center total */}
//             <Typography
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 fontWeight: "bold",
//                 fontSize: "1.2rem",
//                 color: "#555",
//               }}>
//               {total} Total
//             </Typography>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={data}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={80}
//                   paddingAngle={3}
//                   label
//                   cornerRadius={5}
//                   onMouseEnter={(data, index) => {}}>
//                   {data.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                       style={{
//                         transition: "all 0.3s",
//                         cursor: "pointer",
//                       }}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
//                     backgroundColor: "#fff",
//                     padding: "8px 12px",
//                   }}
//                   itemStyle={{ color: "#555", fontWeight: "bold" }}
//                 />
//                 <Legend
//                   layout="horizontal"
//                   verticalAlign="bottom"
//                   align="center"
//                   iconType="circle"
//                   wrapperStyle={{ fontSize: "0.9rem", color: "#555" }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </Box>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }
