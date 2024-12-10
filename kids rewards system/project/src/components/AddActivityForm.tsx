import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../store/activitiesSlice';
import { RootState } from '../store/store';
import { ListPlus } from 'lucide-react';

export const AddActivityForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [childId, setChildId] = useState('');
  const dispatch = useDispatch();
  const children = useSelector((state: RootState) => state.children.children);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && points && childId) {
      dispatch(addActivity({
        id: Date.now().toString(),
        name,
        description,
        points: parseInt(points),
        childId,
        completed: false,
        date: new Date().toISOString(),
      }));
      setName('');
      setDescription('');
      setPoints('');
      setChildId('');
    }
  };

  if (children.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Add a child first to create activities</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ListPlus className="mr-2" />
        Add New Activity
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="childId" className="block text-sm font-medium text-gray-700">
            Child
          </label>
          <select
            id="childId"
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select a child</option>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Activity Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="points" className="block text-sm font-medium text-gray-700">
            Points
          </label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Activity
        </button>
      </div>
    </form>
  );
};