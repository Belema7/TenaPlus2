'use client';
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProgressChart from "./Progress/ProgressChart";
// import ProgressMain from "./Progress/ProgressMain";
import {
  Pill,
  CalendarCheck,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Brain,
  Activity,
  Target,
  Clock,
  Award, 
  Heart,
   Zap,
   CheckCircle2,
} from "lucide-react";

const DashboardBody = () => {
  const [{ tasks }] = useContext(DataContext);

  const completedCount = tasks?.filter((t) => t.completed).length || 0;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const todaysIncompleteTasks =
    tasks?.filter((t) => !t.completed).slice(0, 3) || [];

  return (
    <div className="space-y-10 bg-black">
      {/* Welcome Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-400 text-lg">
                {today} • Your health journey dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-xl border border-gray-700">
                <Award className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-gray-300">
                  {completedCount} tasks completed
                </span>
              </div>
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <Brain className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-lg hover:border-blue-400/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Tasks</p>
                  <p className="text-2xl font-bold text-white">
                    {tasks?.length || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-lg hover:border-emerald-400/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Target className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-white">
                    {completedCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-lg hover:border-purple-400/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-white">
                    {(tasks?.length || 0) - completedCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-lg hover:border-amber-400/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Completion</p>
                  <p className="text-2xl font-bold text-white">
                    {tasks?.length
                      ? Math.round((completedCount / tasks.length) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


<div className="flex justify-between flex-col lg:flex-row">
      {/* Progress Overview */}
      <section className="bg-gray-700 md:w-180">
        <div className="flex items-center justify-between mb-6 ">
          <h2 className="text-2xl font-bold text-white">Progress Overview</h2>
          <Sparkles className="h-5 w-5 text-amber-400" />
        </div>
        <ProgressChart key={tasks?.length || 0} tasks={tasks || []}/>
      </section>

     {/* Priority Tasks – Premium Dark Card */}
<section className="relative">
  {/* Card */}
  <div className="bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 shadow-2xl shadow-red-900/10 overflow-hidden">
    
    {/* Glow accent line at top */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 rounded-t-3xl"></div>

    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-red-500/20 backdrop-blur border border-red-500/30 rounded-2xl">
          <AlertTriangle className="h-7 w-7 text-red-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Priority Tasks</h2>
          <p className="text-sm text-red-300/80">Critical items for today</p>
        </div>
      </div>
      <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
        <span className="text-sm font-bold text-red-400">
          {todaysIncompleteTasks.length} pending
        </span>
      </div>
    </div>

    {/* Task List */}
    {todaysIncompleteTasks.length === 0 ? (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
        </div>
        <p className="text-xl font-medium text-gray-300">All caught up!</p>
        <p className="text-gray-500 mt-2">No priority tasks pending today</p>
      </div>
    ) : (
      <ul className="space-y-4">
        {todaysIncompleteTasks.map((task, index) => (
          <li
            key={task.id}
            className="group relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-red-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/5"
          >
            {/* Index badge */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
              {index + 1}
            </div>

            <div className="flex items-center justify-between pl-8">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white">{task.title}</h4>
                {task.time && (
                  <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {task.time}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <ChevronRight className="h-6 w-6 text-gray-500 group-hover:text-red-400 group-hover:translate-x-2 transition-all duration-300" />
            </div>
          </li>
        ))}
      </ul>
    )}

    {/* Optional: Add a subtle pulse if there are many overdue tasks */}
    {todaysIncompleteTasks.length > 3 && (
      <div className="mt-6 pt-6 border-t border-red-500/20 text-center">
        <p className="text-sm text-red-400 animate-pulse">
          High priority – Complete these to stay on track
        </p>
      </div>
    )}
  </div>
</section>
</div>

      {/* Health Tips */}
    {/* Health Tips – Premium Glassmorphism Card */}
<section className="bg-neutral-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <Brain className="h-7 w-7 text-teal-400" />
      <div>
        <h2 className="text-xl font-bold text-white">Daily Health Tips</h2>
        <p className="text-xs text-gray-500">Small steps, big results</p>
      </div>
    </div>
    <Sparkles className="h-5 w-5 text-teal-400" />
  </div>

  {/* Simple Tip List */}
  <div className="space-y-3">
    {[
      "Drink 8 glasses of water daily",
      "Walk 5 mins every 2 hours",
      "Eat colorful fruits & veggies",
      "Sleep 7–9 hours nightly",
      "Try 4-7-8 breathing for calm",
      "Stretch every hour"
    ].map((tip, i) => (
      <div
        key={i}
        className="flex items-center gap-4 bg-black/30 rounded-xl px-4 py-3 border border-gray-800"
      >
        <span className="text-teal-400 font-bold text-sm">{i + 1}</span>
        <Heart className="h-4 w-4 text-teal-400/70" />
        <p className="text-sm text-gray-300">{tip}</p>
      </div>
    ))}
  </div>

  {/* Footer */}
  <div className="mt-6 pt-5 border-t border-gray-800 text-center">
    <p className="text-xs text-teal-400 font-medium">
      Consistency over Perfection
    </p>
  </div>
</section>


{/* Quick Actions – Ultra Black Edition */}
<section className="relative">
  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white">Quick Actions</h2>
      <p className="text-sm sm:text-base text-gray-500 mt-1">One tap to stay healthy</p>
    </div>
    <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-2xl backdrop-blur">
      <Zap className="h-7 w-7 text-amber-400 animate-pulse" />
    </div>
  </div>

  {/* Grid – Mobile-first */}
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    
    {/* Medication */}
    <Link
      to="/dashboard/medicineinput"
      className="group relative bg-neutral-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl px-4 py-5 overflow-hidden hover:border-blue-500/40 hover:bg-neutral-900/95 transition-all duration-300 active:scale-95"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Pill className="h-7 w-7 text-blue-400 mb-3" />
      <h3 className="font-bold text-white text-sm">Add Medication</h3>
      <p className="text-xs text-gray-500 mt-1">New prescription</p>
    </Link>

    {/* Daily Tasks */}
    <Link
      to="/dashboard/tasks"
      className="group relative bg-neutral-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl px-4 py-5 overflow-hidden hover:border-emerald-500/40 hover:bg-neutral-900/95 transition-all duration-300 active:scale-95"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CalendarCheck className="h-7 w-7 text-emerald-400 mb-3" />
      <h3 className="font-bold text-white text-sm">Daily Tasks</h3>
      <p className="text-xs text-gray-500 mt-1">Today’s schedule</p>
    </Link>

    {/* Progress */}
    <Link
      to="/dashboard/progress"
      className="group relative bg-neutral-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl px-4 py-5 overflow-hidden hover:border-purple-500/40 hover:bg-neutral-900/95 transition-all duration-300 active:scale-95"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <TrendingUp className="h-7 w-7 text-purple-400 mb-3" />
      <h3 className="font-bold text-white text-sm">Progress</h3>
      <p className="text-xs text-gray-500 mt-1">Track improvement</p>
    </Link>

    {/* Support */}
    <Link
      to="/dashboard/support"
      className="group relative bg-neutral-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl px-4 py-5 overflow-hidden hover:border-amber-500/40 hover:bg-neutral-900/95 transition-all duration-300 active:scale-95"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <MessageCircle className="h-7 w-7 text-amber-400 mb-3" />
      <h3 className="font-bold text-white text-sm">Support</h3>
      <p className="text-xs text-gray-500 mt-1">Talk to experts</p>
    </Link>

  </div>
</section>
    </div>
  );
};

export default DashboardBody;