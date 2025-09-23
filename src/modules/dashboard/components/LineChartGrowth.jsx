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

const data = [
  { date: "Jan", issues: 10 },
  { date: "Feb", issues: 20 },
  { date: "Mar", issues: 35 },
  { date: "Apr", issues: 25 },
  { date: "May", issues: 50 },
];

export default function LineChartGrowth() {
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
