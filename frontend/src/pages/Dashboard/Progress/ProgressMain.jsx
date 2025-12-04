// ProgressMain.jsx – Pure Black Premium Edition
import React, { useContext } from 'react'
import { DataContext } from '../../../components/DataProvider/DataProvider'
import ProgressChart from './ProgressChart'
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Calendar,
  Activity,
  Award,
  ChevronLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ProgressMain = () => {
  const [{ tasks }] = useContext(DataContext)

  const completedTasks = tasks?.filter(t => t.completed).length || 0
  const totalTasks = tasks?.length || 0
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const weeklyTrend = [
    { day: 'Mon', completed: 3 },
    { day: 'Tue', completed: 5 },
    { day: 'Wed', completed: 4 },
    { day: 'Thu', completed: 6 },
    { day: 'Fri', completed: 7 },
    { day: 'Sat', completed: 4 },
    { day: 'Sun', completed: 5 }
  ]

  const priorityStats = {
    high: tasks?.filter(t => t.priority?.toLowerCase() === 'high').length || 0,
    medium: tasks?.filter(t => t.priority?.toLowerCase() === 'medium').length || 0,
    low: tasks?.filter(t => t.priority?.toLowerCase() === 'low').length || 0
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:py-12 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="p-3 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl hover:bg-gray-800 transition">
                <ChevronLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">Progress Analytics</h1>
                <p className="text-gray-500 mt-1">Your health journey, visualized</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Summary Stats – Black Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Total Tasks", value: totalTasks, icon: Activity, color: "blue" },
              { label: "Completed", value: completedTasks, rate: completionRate, icon: Award, color: "emerald" },
              { label: "Daily Target", value: Math.round(totalTasks * 0.8), icon: Target, color: "purple" },
              { label: "Day Streak", value: 7, icon: BarChart3, color: "amber" },
            ].map((stat, i) => (
              <div key={i} className="bg-neutral-900/80 backdrop-blur border border-gray-500 rounded-2xl p-5 hover:border-gray-700 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/20 border border-${stat.color}-500/30`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                  </div>
                  {stat.rate !== undefined && (
                    <span className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                      {stat.rate}%
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chart */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Progress by Priority</h2>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-500">Live</span>
            </div>
          </div>
          <div className="bg-gray-700 backdrop-blur-xl border border-gray-800 rounded-3xl p-6">
            <ProgressChart tasks={tasks || []} />
          </div>
        </div>

        {/* Weekly & Priority */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Weekly Trend */}
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Weekly Activity</h3>
                <p className="text-sm text-gray-500">Last 7 days</p>
              </div>
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="space-y-4">
              {weeklyTrend.map((d) => (
                <div key={d.day} className="flex items-center gap-4">
                  <span className="w-10 text-sm font-medium text-gray-400">{d.day}</span>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
                      style={{ width: `${(d.completed / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold w-8 text-right">{d.completed}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-gray-800 text-sm text-gray-500">
              Avg: 4.9 tasks/day • Up 12% from last week
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Priority Levels</h3>
                <p className="text-sm text-gray-500">Task distribution</p>
              </div>
              <Target className="h-6 w-6 text-red-400" />
            </div>
            <div className="space-y-5">
              {[
                { name: "High", count: priorityStats.high, color: "red" },
                { name: "Medium", count: priorityStats.medium, color: "amber" },
                { name: "Low", count: priorityStats.low, color: "emerald" }
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full bg-${p.color}-500`} />
                    <span className="font-medium">{p.name} Priority</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">{p.count}</span>
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${p.color}-500 rounded-full`}
                        style={{ width: `${totalTasks ? (p.count / totalTasks) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-800/50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Insights & Goals</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Consistency", value: "85%", desc: "You're building strong habits", color: "blue" },
              { title: "Best Time", value: "9:00 AM", desc: "Peak performance window", color: "emerald" },
              { title: "Next Goal", value: "90%", desc: "Push for excellence this week", color: "purple" }
            ].map((insight, i) => (
              <div key={i} className="bg-black/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition">
                <div className={`text-${insight.color}-400 font-medium mb-2`}>{insight.title}</div>
                <div className="text-3xl font-bold mb-2">{insight.value}</div>
                <p className="text-sm text-gray-500">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProgressMain