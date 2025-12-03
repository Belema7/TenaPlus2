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
  Cell
} from "recharts";
import { TrendingUp, BarChart3, Target, Award } from "lucide-react";

const ProgressChart = ({ tasks = [] }) => {
  const priorityColors = {
    High: "#EF4444",
    Medium: "#F59E0B",
    Low: "#10B981"
  };

  // Prepare chart data by priority
  const data = ["high", "medium", "low"].map((priority) => {
    const filtered = tasks.filter(t => t.priority?.toLowerCase() === priority);
    const completedCount = filtered.filter(t => t.completed).length;
    const remainingCount = filtered.length - completedCount;
    const completionRate = filtered.length ? Math.round((completedCount / filtered.length) * 100) : 0;

    return {
      priority: priority.charAt(0).toUpperCase() + priority.slice(1),
      Completed: completedCount,
      Remaining: remainingCount,
      Completion: completionRate,
      total: filtered.length
    };
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const overallCompletion = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold text-gray-900 mb-2">{label} Priority</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm font-medium text-gray-700">{entry.name}: {entry.value}</span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">Total: {payload[0]?.payload?.total || 0} tasks</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Task Progress Analytics</h2>
            <p className="text-sm text-gray-600">Completion rate by priority level</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Target className="h-4 w-4" />
          <span>{today}'s Progress</span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Total Tasks</span>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
          <div className="h-2 bg-blue-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completed</span>
            <Award className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{completedTasks}</div>
          <div className="h-2 bg-green-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${overallCompletion}%` }} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completion Rate</span>
            <div className="text-xs font-bold px-2 py-1 bg-purple-100 text-purple-800 rounded-full">{overallCompletion}%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{overallCompletion}%</div>
          <div className="h-2 bg-purple-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${overallCompletion}%` }} />
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={30} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis dataKey="priority" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }} />
          <Legend content={renderLegend} wrapperStyle={{ paddingTop: 10 }} />
          <Bar dataKey="Completed" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-completed-${index}`} fill={priorityColors[entry.priority]} fillOpacity={0.8} />
            ))}
          </Bar>
          <Bar dataKey="Remaining" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-remaining-${index}`} fill={priorityColors[entry.priority]} fillOpacity={0.3} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
