import React, { useContext, useMemo } from "react";
// import { DataContext } from "../../../components/DataProvider/DataProvider";
import {DataContext} from '../../../../components/DataProvider/DataProvider';

const NextUp = () => {
  const [{ tasks }] = useContext(DataContext);

  const nextTask = useMemo(() => {
    const now = new Date();
    const upcoming = tasks
      .filter(task => task.time) // only tasks with time
      .sort((a, b) => new Date(`2000-01-01 ${a.time}`) - new Date(`2000-01-01 ${b.time}`));
    
    return upcoming.find(task => new Date(`2000-01-01 ${task.time}`) >= now) || upcoming[0];
  }, [tasks]);

  if (!nextTask) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-2 text-black">Next Up</h2>
      <p className="text-gray-700 font-medium">{nextTask.title}</p>
      <p className="text-gray-500 text-sm">{nextTask.description}</p>
      <p className="text-gray-400 text-sm mt-1">{nextTask.time} • Priority: {nextTask.priority}</p>
    </div>
  );
};

export default NextUp;
