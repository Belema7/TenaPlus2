// featureData.js

import {
  Heart,
  Calendar,
  Bell,
  Activity
} from "lucide-react";

export const featureData = [
  {
    title: "Personalized Daily Routine",
    description:
      "AI-crafted schedules with medication, exercise, meals, and rest — perfectly timed for you.",
    color: "emerald",
    icon: Calendar,
    items: [
      "Custom exercise plans",
      "Smart medication timing",
      "Diet suggestions",
      "Optimal rest alerts",
    ],
  },
  {
    title: "Smart Medication Reminders",
    description:
      "Never miss a dose with adaptive, context-aware alerts and refill notifications.",
    color: "teal",
    icon: Bell,
    items: [
      "Timely alerts",
      "Drug info & interactions",
      "Side effect tracking",
      "Auto refill reminders",
    ],
  },
  {
    title: "Motivational Support",
    description:
      "Stay encouraged with daily positive messages and milestone celebrations.",
    color: "emerald",
    icon: Heart,
    items: [
      "Daily encouragement",
      "Progress celebrations",
      "Mood-based support",
      "Streak tracking",
    ],
  },
  {
    title: "Progress Tracking",
    description:
      "See your improvement with beautiful charts, trends, and achievement badges.",
    color: "teal",
    icon: Activity,
    items: [
      "Health metrics dashboard",
      "Visual progress charts",
      "Trend analysis",
      "Milestone rewards",
    ],
  },
];
