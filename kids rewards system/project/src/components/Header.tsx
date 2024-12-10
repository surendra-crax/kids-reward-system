import React from 'react';
import { Link } from 'react-router-dom';
import { Medal, Home, Award } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Medal className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">KidsReward</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700">
              <Home className="h-5 w-5 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/rewards" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700">
              <Award className="h-5 w-5 mr-1" />
              <span>Rewards</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};