"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const SalesOverviewChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const salesData = [
    { name: "Jan", sales: 4200 },
    { name: "Feb", sales: 3800 },
    { name: "Mar", sales: 5100 },
    { name: "Apr", sales: 4600 },
    { name: "May", sales: 5400 },
    { name: "Jun", sales: 7200 },
    { name: "Jul", sales: 6100 },
    { name: "Aug", sales: 2900 },
    { name: "Sep", sales: 6800 },
    { name: "Oct", sales: 6300 },
    { name: "Nov", sales: 7100 },
    { name: "Dec", sales: 7500 },
  ];

  // Prevent SSR rendering issues
  if (!isMounted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className=" backdrop-blur-md shadow rounded-xl p-4 md:p-6  mx- md:mx-0 "
      >
        <h2 className=" md:text-lg font-medium mb-4 text-gray-900 text-center md:text-left ">
          Sales Overview
        </h2>
        <div className="h-64 md:h-80" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className=" backdrop-blur-md shadow rounded-xl p-4 md:p-6  mx- md:mx-0 "
    >
      <h2 className=" md:text-lg font-medium mb-4 text-gray-900 text-center md:text-left ">
        Sales Overview
      </h2>
      <div className="h-64 md:h-80 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="2 2" stroke="#4b5563" />
            <XAxis
              dataKey="name"
              stroke="#000"
              tick={{ fontSize: 12 }}
              // interval="preserveEnd"
            />
            <YAxis width={40} stroke="#000" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderColor: "#4b5563",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#9c27b0"
              strokeWidth={3}
              dot={{ fill: "#9c27b0", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
