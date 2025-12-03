import React, { useState, useContext } from "react";
import { DataContext } from "../../../components/DataProvider/DataProvider";
import { Type } from "../../../Utility/action.type";
import { Link, useNavigate } from "react-router-dom";
import { 
  Pill, 
  AlertCircle, 
  Clock, 
  Activity,
  Loader2,
  Plus,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const MedicationInput = () => {
  const [, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    medicationName: "",
    dosage: "",
    timesPerDay: "",
    specialNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateTasks = async (e) => {
    e.preventDefault();
    if (!form.medicationName || !form.dosage) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        const newTasks = data.map((t, idx) => ({
          ...t,
          id: Date.now() + idx,
        }));

        // Save tasks into global state
        dispatch({
          type: Type.SET_TASKS,
          tasks: newTasks,
        });

        // 🔥🔥 NEW — Trigger motivation refresh
        dispatch({
          type: Type.TRIGGER_MOTIVATION_REFRESH,
        });

        setSuccess(true);

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/dashboard/tasks");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:py-12 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            AI Medication Assistant
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Enter your medication details to generate personalized health tasks
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 sm:px-8 py-5 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Medication Details
                </h2>
                <p className="text-blue-100 text-sm sm:text-base">
                  Fill in your prescription information
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={generateTasks} className="p-6 sm:p-8 space-y-6">

            {/* Medication Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Pill className="h-4 w-4 text-blue-600" />
                Medication Name *
              </label>
              <input
                type="text"
                name="medicationName"
                placeholder="e.g., Metformin, Lisinopril, Atorvastatin"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={form.medicationName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Dosage & Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosage *
                </label>
                <input
                  type="text"
                  name="dosage"
                  placeholder="e.g., 500mg, 10mg"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl"
                  value={form.dosage}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Times Per Day
                </label>
                <input
                  type="number"
                  name="timesPerDay"
                  placeholder="1, 2, 3"
                  min="1"
                  max="10"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl"
                  value={form.timesPerDay}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                Special Notes
              </label>
              <textarea
                name="specialNotes"
                rows="4"
                placeholder="Take with food, avoid alcohol..."
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl"
                value={form.specialNotes}
                onChange={handleChange}
              />
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">What happens next?</h3>
                  <p className="text-sm text-blue-800">
                    Our AI will analyze your medication details and generate a personalized plan.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              {success ? (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-5 rounded-xl text-center animate-pulse">
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="text-lg font-semibold">
                      Tasks Generated Successfully! Redirecting...
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !form.medicationName || !form.dosage}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Generating AI Tasks...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Plus className="h-5 w-5" />
                      <span>Generate Personalized Health Plan</span>
                    </div>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 sm:mt-10">
          <Feature icon={<Clock />} title="Smart Scheduling" desc="Optimal medication timing" />
          <Feature icon={<AlertCircle />} title="Safety Alerts" desc="Food & drug interaction warnings" />
          <Feature icon={<Activity />} title="Health Monitoring" desc="Track side effects & progress" />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
      {icon}
    </div>
    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default MedicationInput;
