import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Col, Row } from 'react-bootstrap';
export default function SummaryCards({ summary }) {
  return (
    <Row className="mb-4">
      {summary.map((item, index) => (
        <Col md={3} sm={6} xs={12} key={item.label} className="mb-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h4" color={item.color} fontWeight="bold">
                  {item.count}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
}
