'use client'; // ← CRITICAL FOR NEXT.JS APP ROUTER

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, BarChart3, Target, Award } from "lucide-react";

const ProgressChart = ({ tasks = [] }) => {
  // Safe priority mapping
  const normalizePriority = (p) => {
    if (!p) return "low";
    const lower = p.toString().toLowerCase();
    if (lower.includes("high")) return "high";
    if (lower.includes("medium")) return "medium";
    return "low";
  };

  const priorityColors = {
    high: "#EF4444",
    medium: "#F59E0B",
    low: "#10B981",
  };

  const data = ["high", "medium", "low"].map((priority) => {
    const filtered = tasks.filter(
      (t) => normalizePriority(t.priority) === priority
    );
    const completedCount = filtered.filter((t) => t.completed).length;
    const total = filtered.length;

    return {
      priority: priority.charAt(0).toUpperCase() + priority.slice(1),
      Completed: completedCount,
      Remaining: total - completedCount,
      Completion: total ? Math.round((completedCount / total) * 100) : 0,
      total,
      color: priorityColors[priority], // for tooltip/legend
    };
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const overallCompletion = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur border border-white/20 text-white p-4 rounded-xl shadow-2xl">
          <p className="font-bold mb-3">{label} Priority</p>
          {payload.map((entry, i) => (
            <p key={i} className="text-sm flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}: <strong>{entry.value}</strong>
            </p>
          ))}
          <p className="text-xs text-gray-400 mt-2">
            Total: {payload[0].payload.total} tasks
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-2xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Progress Analytics</h2>
            <p className="text-gray-400 text-sm">By priority level</p>
          </div>
        </div>
      </div>

      {/* Make sure container has height */}
      <div className="w-full h-80 -mx-6 -mb-6 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="priority"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF" }}
            />
            <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Completed" radius={[8, 8, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={`completed-${i}`}>
                  <Cell fill={priorityColors[entry.priority.toLowerCase()]} />
                </Cell>
              ))}
            </Bar>
            <Bar dataKey="Remaining" radius={[8, 8, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={`remaining-${i}`}
                  fill={priorityColors[entry.priority.toLowerCase()]}
                  fillOpacity={0.3}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;