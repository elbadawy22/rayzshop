"use client";
import { motion } from "framer-motion";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
const COLORS = ["#FFD166", "#4D96FF","#FF6B6B" , "#06D6A0", "#A29BFE"];
interface ChartsUsers {
  totalUsers: number;
  customers: number;
  guests: number;
  admins: number;
  ordersMang: number;
  productsMang: number;
}
const UserChartColor = ({
  charts,
}: {
  charts: ChartsUsers | undefined;
}) => {

  const data: { name: string; value: number }[] = [];
  Object.entries({ ...charts }).forEach(([key, value]) => {
    if (key && value) {
      if (key !== "totalUsers") {
        data.push({ name: key.toUpperCase(), value: value as number });
      }
    }
  });
  // setOrderData(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className=" shadow backdrop-blur-md rounded-xl p-4 md:p-6  mx-2 md:mx-0 "
    >
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-900 text-center md:text-left ">
        User Distribution
      </h2>
      <div className=" w-full h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={{ stroke: "#9ca3af" }}
              outerRadius={70}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${
                  percent !== undefined ? (percent * 100).toFixed(0) : "0"
                }% `
              }
            >
              {data.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderBlock: "#4b5563",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "8px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              align="center"
              wrapperStyle={{
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserChartColor;
