// LineChartGrowth.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function LineChartGrowth({ issues = [] }) {
  // Compute counts per month
  const monthlyCounts = issues.reduce((acc, issue) => {
    const month = dayjs(issue.createdAt).format("MMM YYYY"); // e.g., Jan 2025
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Convert to array and sort by date
  const data = Object.keys(monthlyCounts)
    .map((month) => ({ date: month, issues: monthlyCounts[month] }))
    .sort((a, b) => dayjs(a.date, "MMM YYYY") - dayjs(b.date, "MMM YYYY"));

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Issues Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="issues"
                stroke="#1976d2"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
