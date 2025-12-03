// ProgressMain.jsx
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

  // Calculate statistics
  const completedTasks = tasks?.filter(t => t.completed).length || 0
  const totalTasks = tasks?.length || 0
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  // Weekly trend (mock data for now)
  const weeklyTrend = [
    { day: 'Mon', completed: 3 },
    { day: 'Tue', completed: 5 },
    { day: 'Wed', completed: 4 },
    { day: 'Thu', completed: 6 },
    { day: 'Fri', completed: 7 },
    { day: 'Sat', completed: 4 },
    { day: 'Sun', completed: 5 }
  ]

  // Priority breakdown
  const priorityStats = {
    high: tasks?.filter(t => t.priority?.toLowerCase() === 'high').length || 0,
    medium: tasks?.filter(t => t.priority?.toLowerCase() === 'medium').length || 0,
    low: tasks?.filter(t => t.priority?.toLowerCase() === 'low').length || 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:py-12 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Progress Analytics</h1>
                <p className="text-gray-600">Track your health journey with detailed insights</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
              <div className="text-sm font-medium text-gray-600">Total Tasks</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-xs font-bold px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {completionRate}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{completedTasks}</div>
              <div className="text-sm font-medium text-gray-600">Completed</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-xs font-bold px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                  Daily Goal
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(totalTasks * 0.8)}
              </div>
              <div className="text-sm font-medium text-gray-600">Daily Target</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                  Streak
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-sm font-medium text-gray-600">Days Active</div>
            </div>
          </div>
        </div>

        {/* Main Progress Chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Detailed Progress Analysis</h2>
              <p className="text-gray-600">Completion breakdown by priority levels</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live updates</span>
            </div>
          </div>
          <ProgressChart key={tasks?.length || 0} tasks={tasks || []} />
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Trend */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Weekly Trend</h3>
                <p className="text-gray-600">Your activity over the past 7 days</p>
              </div>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-3">
              {weeklyTrend.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: `${(day.completed / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-8 text-right">
                    {day.completed}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Average daily completion: 4.9 tasks</span>
                <span className="text-green-600 font-medium">↑ 12% from last week</span>
              </div>
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Priority Distribution</h3>
                <p className="text-gray-600">Tasks categorized by importance</p>
              </div>
              <Target className="h-5 w-5 text-red-600" />
            </div>
            <div className="space-y-4">
              {Object.entries(priorityStats).map(([priority, count]) => (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      priority === 'high' ? 'bg-red-500' :
                      priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {priority} Priority
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">{count}</span>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          priority === 'high' ? 'bg-red-500' :
                          priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(count / totalTasks) * 100 || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-red-600">Tip:</span> Focus on completing high-priority tasks first for maximum health impact.
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
              <div className="text-sm font-semibold text-blue-700 mb-2">Consistency Score</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">85%</div>
              <p className="text-xs text-gray-600">You're consistently completing tasks at the same time each day.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200">
              <div className="text-sm font-semibold text-green-700 mb-2">Best Time</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">9:00 AM</div>
              <p className="text-xs text-gray-600">Most tasks are completed in the morning. Keep it up!</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
              <div className="text-sm font-semibold text-purple-700 mb-2">Next Goal</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">90% Rate</div>
              <p className="text-xs text-gray-600">Aim for 90% completion rate this week.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressMain