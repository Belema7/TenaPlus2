// DailyTasks.jsx - Modern Dark Mode Redesign
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
  X,
} from "lucide-react";

const DailyTasks = () => {
  const [{ tasks }] = useContext(DataContext);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("time");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const priorityOrder = { high: 1, medium: 2, low: 3 };

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

  const priorityCounts = useMemo(
    () => ({
      high: tasks.filter((t) => t.priority?.toLowerCase() === "high").length,
      medium: tasks.filter((t) => t.priority?.toLowerCase() === "medium").length,
      low: tasks.filter((t) => t.priority?.toLowerCase() === "low").length,
    }),
    [tasks]
  );

  // Empty State - Dark Mode
  if (!tasks || tasks.length === 0) {
    return (
      <div className="min-h-screen bg-transparent text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Your Health Tasks
          </h1>
          <p className="text-gray-400 text-lg mb-10">
            AI-powered personalized health schedule
          </p>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            <Calendar className="h-20 w-20 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">No Tasks Yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
              Add your medications to unlock your personalized AI health plan with reminders and schedules.
            </p>
            <Link
              to="/dashboard/medicineinput"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/30"
            >
              <Plus className="h-6 w-6" />
              Add Medications
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:py-12 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DailyTaskHeader />

        {/* Action Bar - Glassmorphism */}
        <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-all duration-300"
              >
                {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                <span className="font-medium">Filters & Sort</span>
              </button>

              <Link
                to="/dashboard/medicineinput"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl font-semibold shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
                Add Medication
              </Link>
            </div>

            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 transition-all backdrop-blur"
              />
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-white/10 animate-in slide-in-from-top duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Priority */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-4">
                    <Filter className="h-4 w-4 text-purple-400" />
                    Priority
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {["all", "high", "medium", "low"].map((val) => (
                      <button
                        key={val}
                        onClick={() => setFilter(val)}
                        className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                          filter === val
                            ? val === "high"
                              ? "bg-red-500/20 text-red-400 border border-red-500/50"
                              : val === "medium"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                              : val === "low"
                              ? "bg-green-500/20 text-green-400 border border-green-500/50"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300"
                        }`}
                      >
                        {val.charAt(0).toUpperCase() + val.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-4">
                    <SortAsc className="h-4 w-4 text-purple-400" />
                    Sort By
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: "time", label: "Time", icon: Clock },
                      { value: "priority", label: "Priority", icon: AlertCircle },
                      { value: "title", label: "Name", icon: Target },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setSortBy(value)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                          sortBy === value
                            ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-purple-400" />
                          <span>{label}</span>
                        </div>
                        {sortBy === value && <div className="w-3 h-3 bg-purple-400 rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-4">
                    <BarChart3 className="h-4 w-4 text-purple-400" />
                    Priority Stats
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(priorityCounts).map(([key, count]) => (
                      <div
                        key={key}
                        className={`p-4 rounded-2xl text-center border backdrop-blur ${
                          key === "high"
                            ? "bg-red-500/10 border-red-500/30"
                            : key === "medium"
                            ? "bg-yellow-500/10 border-yellow-500/30"
                            : "bg-green-500/10 border-green-500/30"
                        }`}
                      >
                        <div className="text-3xl font-bold">
                          {count}
                        </div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Motivation + Next Up */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <NextUp tasks={tasks} />
          {/* <DailyMotivation /> */}
        </div>

        {/* Active Filters Chips */}
        {(filter !== "all" || searchQuery || sortBy !== "time") && (
          <div className="mb-6 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm text-gray-400">Active filters:</span>
              <div className="flex flex-wrap gap-3">
                {filter !== "all" && (
                  <span className="flex items-center gap-2 px-4 py-2 bg-purple-600/30 border border-purple-500/50 rounded-xl text-sm">
                    {filter} priority
                    <X
                      className="h-4 w-4 cursor-pointer hover:text-white"
                      onClick={() => setFilter("all")}
                    />
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-xl text-sm">
                    "{searchQuery}"
                    <X
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => setSearchQuery("")}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tasks Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold">Your Tasks</h2>
            <p className="text-gray-400">
              {sortedTasks.length} shown • {tasks.length} total
            </p>
          </div>
          <button
            onClick={() => {
              setFilter("all");
              setSearchQuery("");
              setSortBy("time");
            }}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Clear filters
          </button>
        </div>

        {/* Task Grid */}
        {sortedTasks.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">No tasks found</h3>
            <p className="text-gray-400 mb-8">Try adjusting your filters</p>
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
                setSortBy("time");
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedTasks.map((task) => (
              <DailyTaskCard key={task.id} task={task} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p className="text-lg">
            <span className="text-white font-bold">{sortedTasks.filter(t => t.completed).length}</span> completed •{" "}
            <span className="text-green-400 font-bold">
              {Math.round((sortedTasks.filter(t => t.completed).length / sortedTasks.length) * 100) || 0}%
            </span>{" "}done
          </p>
          <div className="mt-6 flex justify-center gap-8">
            <Link to="/dashboard/medicineinput" className="flex items-center gap-2 hover:text-white transition">
              <Plus className="h-5 w-5" /> Add Medication
            </Link>
            <Link to="/dashboard/ai" className="flex items-center gap-2 hover:text-white transition">
              <Sparkles className="h-5 w-5" /> Ask AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTasks;