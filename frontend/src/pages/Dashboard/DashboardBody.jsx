import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DailyTaskHeader from './DailyTasks/components/DailyTaskHeader'
import { DataContext } from '../../components/DataProvider/DataProvider'
import ProgressChart from './Progress/ProgressChart'
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
  Zap
} from 'lucide-react'

const DashboardBody = () => {
  const [{ tasks }] = useContext(DataContext);

  const completedCount = tasks?.filter(t => t.completed).length || 0;
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  // Get today's incomplete tasks
  const todaysIncompleteTasks = tasks?.filter(t => !t.completed).slice(0, 3) || [];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 -z-10" />
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                {today} • Your health journey dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {completedCount} tasks completed
                </span>
              </div>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Brain className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{tasks?.length || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(tasks?.length || 0) - completedCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks?.length ? Math.round((completedCount / tasks.length) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600">Manage your health in one click</p>
          </div>
          <Zap className="h-5 w-5 text-amber-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to="/dashboard/medicineinput" 
            className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Pill className="h-5 w-5" />
                </div>
                <span className="text-sm opacity-90">Add</span>
              </div>
              <h3 className="text-lg font-bold mb-2">New Medication</h3>
              <p className="text-sm opacity-80 mb-3">Add prescription details</p>
              <div className="flex items-center text-sm opacity-90 group-hover:translate-x-1 transition-transform">
                <span>Get started</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link 
            to="/dashboard/tasks" 
            className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <span className="text-sm opacity-90">View</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Daily Tasks</h3>
              <p className="text-sm opacity-80 mb-3">Check your schedule</p>
              <div className="flex items-center text-sm opacity-90 group-hover:translate-x-1 transition-transform">
                <span>View tasks</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link 
            to="/dashboard/progress" 
            className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-sm opacity-90">Track</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Progress</h3>
              <p className="text-sm opacity-80 mb-3">Analytics & insights</p>
              <div className="flex items-center text-sm opacity-90 group-hover:translate-x-1 transition-transform">
                <span>See progress</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link 
            to="/dashboard/Contacts" 
            className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <span className="text-sm opacity-90">Emergency</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Contacts</h3>
              <p className="text-sm opacity-80 mb-3">Safety & support</p>
              <div className="flex items-center text-sm opacity-90 group-hover:translate-x-1 transition-transform">
                <span>View contacts</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* AI Assistant - Full Width */}
        <Link 
          to="/dashboard/aihelp" 
          className="mt-4 group block"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-yellow-600/20" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">AI Health Assistant</h3>
                  <p className="opacity-90">Get instant answers about medications, schedules, and health tips</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
                <span className="font-medium">Chat Now</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Progress Overview */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Progress Overview</h2>
            <p className="text-gray-600">Visual analytics of your health journey</p>
          </div>
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>
        <ProgressChart tasks={tasks} />
      </section>

      {/* Today's Priority Tasks */}
      {todaysIncompleteTasks.length > 0 && (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Today's Priority</h2>
              <p className="text-gray-600">Important tasks to complete today</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
              <Clock className="h-4 w-4" />
              <span>Time-sensitive</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todaysIncompleteTasks.map((task, index) => (
              <Link 
                key={task.id} 
                to="/dashboard/tasks"
                className="group p-4 border border-gray-200 hover:border-blue-300 rounded-xl hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    task.priority === 'high' ? 'bg-red-100 text-red-600' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition">
                      {task.title}
                    </h4>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{task.time}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link 
              to="/dashboard/tasks" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View all tasks</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Health Tips */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Daily Health Tip</h3>
            <p className="text-sm text-gray-600">Stay consistent with your health goals</p>
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
          <p className="text-gray-700">
            💡 <strong>Consistency is key!</strong> Taking medications at the same time every day 
            maintains stable levels in your system and improves effectiveness. Set reminders 
            and stick to your schedule for optimal results.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DashboardBody