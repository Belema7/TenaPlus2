import React, { useContext } from "react";
import { DataContext } from '../../../../components/DataProvider/DataProvider';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Target,
  TrendingUp,
  Award,
  Sparkles,
  BarChart3,
  Brain
} from "lucide-react";

const DailyTaskHeader = () => {
  const [{ tasks }] = useContext(DataContext);

  const getCompletedCount = () => tasks.filter(t => t.completed).length;
  const remainingCount = tasks.length - getCompletedCount();
  const completionRate = tasks.length > 0 ? Math.round((getCompletedCount() / tasks.length) * 100) : 0;

  // Calculate time-based stats
  const morningTasks = tasks.filter(t => {
    const hour = parseInt(t.time?.split(':')[0] || 0);
    return hour >= 6 && hour < 12;
  }).length;
  
  const afternoonTasks = tasks.filter(t => {
    const hour = parseInt(t.time?.split(':')[0] || 0);
    return hour >= 12 && hour < 18;
  }).length;

  const getMotivationMessage = () => {
    if (completionRate === 100) return "🎉 Perfect! You've completed all tasks!";
    if (completionRate >= 80) return "🔥 Amazing progress! Keep it up!";
    if (completionRate >= 50) return "📈 Great work! Halfway there!";
    if (completionRate >= 25) return "🚀 Good start! Keep moving forward!";
    return "🌟 Let's start your health journey!";
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-full translate-y-48 -translate-x-48" />

      <div className="relative z-10 px-4 sm:px-6">
        {/* Main Header */}
        <div className="text-center pt-8 pb-12">
          

        
        </div>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {/* Total Tasks Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{tasks.length}</div>
              <div className="text-sm font-medium text-gray-600 mb-2">Total Tasks</div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Completed Tasks Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-xs font-bold px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {completionRate}%
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{getCompletedCount()}</div>
              <div className="text-sm font-medium text-gray-600 mb-2">Completed</div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" 
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            {/* Remaining Tasks Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {remainingCount} left
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{remainingCount}</div>
              <div className="text-sm font-medium text-gray-600 mb-2">Remaining</div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
                  style={{ width: `${Math.min(100, (remainingCount / tasks.length) * 100)}%` }}
                />
              </div>
            </div>

            {/* Completion Rate Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{completionRate}%</div>
              <div className="text-sm font-medium text-gray-600 mb-2">Completion Rate</div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" 
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default DailyTaskHeader;