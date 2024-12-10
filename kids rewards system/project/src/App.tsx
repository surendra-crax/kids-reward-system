import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/Header';
import { AddChildForm } from './components/AddChildForm';
import { ChildList } from './components/ChildList';
import { AddActivityForm } from './components/AddActivityForm';
import { ActivityList } from './components/ActivityList';
import { AddRewardForm } from './components/AddRewardForm';
import { RewardList } from './components/RewardList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AddChildForm />
                    <ChildList />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AddActivityForm />
                    <ActivityList />
                  </div>
                </div>
              } />
              <Route path="/rewards" element={
                <div className="space-y-6">
                  <AddRewardForm />
                  <RewardList />
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;