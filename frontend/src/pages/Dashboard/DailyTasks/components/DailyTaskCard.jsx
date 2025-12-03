import React, { useContext, useState } from "react";
import { DataContext } from '../../../../components/DataProvider/DataProvider';
import { Type } from '../../../../Utility/action.type';
import * as Icons from "lucide-react";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Bell,
  Calendar,
  Activity,
  Heart,
  Pill,
  Sun,
  Moon,
  Coffee,
  Utensils,
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Share2
} from "lucide-react";

const iconMap = {
  Clock: Icons.Clock,
  Pill: Icons.Pill,
  AlertCircle: Icons.AlertCircle,
  Bell: Icons.Bell,
  Calendar: Icons.Calendar,
  Activity: Icons.Activity,
  Heart: Icons.Heart,
  Sun: Icons.Sun,
  Moon: Icons.Moon,
  Coffee: Icons.Coffee,
  Utensils: Icons.Utensils,
};

const priorityConfig = {
  high: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-800",
    icon: AlertCircle
  },
  medium: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-800",
    icon: Clock
  },
  low: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800",
    icon: CheckCircle
  }
};

const DailyTaskCard = ({ task }) => {
  const [, dispatch] = useContext(DataContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const Icon = iconMap[task.icon] || Icons.Clock;
  const PriorityIcon = priorityConfig[task.priority]?.icon || Clock;
  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  const toggleCompleted = () => {
    dispatch({
      type: Type.UPDATE_TASK,
      taskId: task.id,
      updates: { completed: !task.completed },
    });
  };

  const toggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({
      type: Type.DELETE_TASK,
      taskId: task.id,
    });
  };

  const getTimeIcon = () => {
    if (task.time) {
      const hour = parseInt(task.time.split(':')[0]);
      return hour < 12 ? Sun : Moon;
    }
    return Clock;
  };

  const TimeIcon = getTimeIcon();

  return (
    <div className={`group rounded-2xl border ${priority.border} ${task.completed ? 'bg-gradient-to-br from-green-50 to-emerald-50' : priority.bg} p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      <div className="flex items-start gap-4">
        {/* Completion Checkbox */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={toggleCompleted}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              task.completed 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-200' 
                : 'bg-white border border-gray-300 hover:border-green-400 hover:shadow-md'
            }`}
          >
            {task.completed ? (
              <CheckCircle className="w-5 h-5 text-white animate-scale-in" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 group-hover:border-green-500 transition-colors" />
            )}
          </button>

          {/* Task Icon */}
          <div className={`p-2.5 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-white border border-gray-100'} shadow-sm`}>
            <Icon className={`w-6 h-6 ${task.completed ? 'text-green-600' : priority.text}`} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-lg font-bold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${priority.badge}`}>
                  <PriorityIcon className="w-3 h-3" />
                  {task.priority}
                </span>
              </div>
              
              <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                {task.description}
              </p>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              {showActions && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowActions(false)}
                  />
                  <div className="absolute right-0 top-8 z-20 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit Task
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Set Reminder
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Time & Category */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
              <TimeIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{task.time}</span>
            </div>
            
            {task.category && (
              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100">
                {task.category}
              </span>
            )}
            
            {task.duration && (
              <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-sm font-medium rounded-lg border border-purple-100">
                {task.duration}
              </span>
            )}
          </div>

          {/* Additional Details */}
          {showDetails && task.details && (
            <div className="mt-4 p-4 bg-white/70 rounded-xl border border-gray-200 animate-slide-down">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Details</h4>
                <AlertCircle className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">{task.details}</p>
              {task.warning && (
                <div className="mt-3 p-2.5 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-xs text-orange-700 font-medium">⚠️ {task.warning}</p>
                </div>
              )}
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50">
            <div className="flex gap-3">
              <button
                onClick={toggleDetails}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    View Details
                  </>
                )}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-700 transition">
                <Bell className="w-4 h-4" />
                Remind
              </button>
            </div>
            
            {task.completed && (
              <div className="flex items-center gap-1.5 text-sm text-green-600 font-medium animate-fade-in">
                <CheckCircle className="w-4 h-4" />
                Completed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTaskCard;