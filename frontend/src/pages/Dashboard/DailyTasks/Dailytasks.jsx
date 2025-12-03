// DailyTasks.jsx
import React, { useContext, useState, useMemo } from "react";
import { DataContext } from "../../../components/DataProvider/DataProvider";
import DailyTaskCard from "./components/DailyTaskCard";
import DailyTaskHeader from "./components/DailyTaskHeader";
import NextUp from "./components/NextUp";
import DailyMotivation from "./components/DailyMotivation";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  Plus,
  Search,
  Filter,
  SortAsc,
  Clock,
  AlertCircle,
  Target,
  BarChart3,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";

const DailyTasks = () => {
  const [{ tasks }] = useContext(DataContext);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("time");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  // Filtered + Sorted Tasks
  const sortedTasks = useMemo(() => {
    if (!tasks || tasks.length === 0) return [];

    const filtered = tasks.filter((task) => {
      const priority = task.priority?.toLowerCase() || "";
      const matchesFilter = filter === "all" || priority === filter;
      const matchesSearch =
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "priority") {
        const getPriorityValue = (p) => priorityOrder[p?.toLowerCase()] || 4;
        return getPriorityValue(a.priority) - getPriorityValue(b.priority);
      }
      if (sortBy === "time") {
        const parseTime = (t) => {
          if (!t) return new Date("2000-01-01T00:00:00");
          let d = new Date(`2000-01-01T${t}`);
          if (isNaN(d.getTime())) d = new Date(`2000-01-01 ${t}`);
          return d;
        };
        return parseTime(a.time) - parseTime(b.time);
      }
      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });
  }, [tasks, filter, searchQuery, sortBy]);

  // Priority Counts
  const priorityCounts = useMemo(
    () => ({
      high: tasks.filter((t) => t.priority?.toLowerCase() === "high").length,
      medium: tasks.filter((t) => t.priority?.toLowerCase() === "medium").length,
      low: tasks.filter((t) => t.priority?.toLowerCase() === "low").length,
    }),
    [tasks]
  );

  // Empty State
  if (!tasks || tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Your Health Tasks</h1>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            AI-generated personalized health schedule
          </p>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Tasks Yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start by adding your medications to generate a personalized health plan with AI tasks, reminders, and schedules.
            </p>
            <Link
              to="/dashboard/medicineinput"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              Add Medications
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:py-12 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Header */}
        <DailyTaskHeader />
        
        {/* Action Bar */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 font-medium rounded-xl border border-gray-200 transition-all duration-200"
              >
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span>Filters & Sorting</span>
              </button>
              <Link
                to="/dashboard/medicineinput"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Add Medication</span>
              </Link>
            </div>
            
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          
          {/* Expandable Filters Section */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-down">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-blue-600" />
                    Priority Filter
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "all", label: "All", bg: "bg-gray-100 hover:bg-gray-200", text: "text-gray-700" },
                      { value: "high", label: "High", bg: "bg-red-100 hover:bg-red-200", text: "text-red-700" },
                      { value: "medium", label: "Medium", bg: "bg-yellow-100 hover:bg-yellow-200", text: "text-yellow-700" },
                      { value: "low", label: "Low", bg: "bg-green-100 hover:bg-green-200", text: "text-green-700" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilter(option.value)}
                        className={`px-3 py-2 rounded-lg font-medium transition ${option.bg} ${option.text} ${filter === option.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <SortAsc className="h-4 w-4 text-blue-600" />
                    Sort By
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "time", label: "Time", icon: Clock },
                      { value: "priority", label: "Priority", icon: AlertCircle },
                      { value: "title", label: "Name", icon: Calendar }
                    ].map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition ${sortBy === option.value ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50'}`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{option.label}</span>
                          {sortBy === option.value && (
                            <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    Priority Breakdown
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(priorityCounts).map(([priority, count]) => (
                      <div
                        key={priority}
                        className={`p-3 rounded-xl border ${priority === 'high' ? 'border-red-200 bg-red-50' : priority === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}`}
                      >
                        <div className="text-sm text-gray-600 capitalize">{priority}</div>
                        <div className={`text-2xl font-bold ${priority === 'high' ? 'text-red-600' : priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                          {count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Motivation & Next Up Side by Side */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <DailyMotivation /> */}
          <NextUp tasks={tasks} />
        </div>
        
        {/* Active Filters Display */}
        {(filter !== "all" || searchQuery || sortBy !== "time") && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Filter className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Active Filters</h4>
                  <p className="text-sm text-blue-700">Tasks are filtered based on your selections</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {filter !== "all" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 text-blue-700 text-sm font-medium rounded-lg">
                    <span className="capitalize">{filter} Priority</span>
                    <button 
                      onClick={() => setFilter("all")}
                      className="hover:text-blue-900 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-purple-200 text-purple-700 text-sm font-medium rounded-lg">
                    <Search className="h-3 w-3" />
                    <span>"{searchQuery}"</span>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="hover:text-purple-900 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {sortBy !== "time" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-green-200 text-green-700 text-sm font-medium rounded-lg">
                    <SortAsc className="h-3 w-3" />
                    <span>Sorted by {sortBy}</span>
                    <button 
                      onClick={() => setSortBy("time")}
                      className="hover:text-green-900 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Task Grid Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
            <p className="text-gray-600">
              {sortedTasks.length} of {tasks.length} tasks shown
              {filter !== "all" && ` • Filtered by ${filter} priority`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">
              <span className="font-medium">{sortedTasks.filter(t => t.completed).length}</span> completed •{" "}
              <span className="font-medium">{sortedTasks.filter(t => !t.completed).length}</span> remaining
            </div>
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
                setSortBy("time");
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              disabled={filter === "all" && !searchQuery && sortBy === "time"}
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          </div>
        </div>
        
        {/* Tasks Grid */}
        {sortedTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No matching tasks</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No tasks found with the current filters. Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
                setSortBy("time");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sortedTasks.map((task) => (
              <DailyTaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{sortedTasks.length}</span> tasks •{" "}
              <span className="font-medium text-green-600">{Math.round((sortedTasks.filter(t => t.completed).length / sortedTasks.length) * 100) || 0}%</span> completion rate
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard/medicineinput"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add more medications
              </Link>
              <div className="h-4 w-px bg-gray-300"></div>
              <Link
                to="/dashboard/ai"
                className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <Sparkles className="h-4 w-4" />
                Ask AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTasks;