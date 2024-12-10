import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Star, Trophy } from 'lucide-react';

export const ChildList = () => {
  const children = useSelector((state: RootState) => state.children.children);

  if (children.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No children added yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Trophy className="mr-2" />
        Children Progress
      </h2>
      <div className="space-y-4">
        {children.map((child) => (
          <div key={child.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{child.name}</h3>
                <p className="text-sm text-gray-500">Age: {child.age}</p>
              </div>
              <div className="flex items-center">
                <Star className="text-yellow-400 w-5 h-5 mr-1" />
                <span className="font-bold">{child.points} points</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};