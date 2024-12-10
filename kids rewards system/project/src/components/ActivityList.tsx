import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleActivity, deleteActivity } from '../store/activitiesSlice';
import { updateChildPoints } from '../store/childrenSlice';
import { CheckCircle, XCircle, Trash } from 'lucide-react';
import { format } from 'date-fns';

export const ActivityList = () => {
  const activities = useSelector((state: RootState) => state.activities.activities);
  const dispatch = useDispatch();

  const handleToggle = (activityId: string, points: number, childId: string, completed: boolean) => {
    dispatch(toggleActivity(activityId));
    dispatch(updateChildPoints({ 
      childId, 
      points: completed ? -points : points 
    }));
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No activities added yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{activity.name}</h3>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400">
                  {format(new Date(activity.date), 'PPP')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{activity.points} points</span>
                <button
                  onClick={() => handleToggle(activity.id, activity.points, activity.childId, activity.completed)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  {activity.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </button>
                <button
                  onClick={() => dispatch(deleteActivity(activity.id))}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Trash className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};