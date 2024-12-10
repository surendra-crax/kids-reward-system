import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../types';

interface ActivitiesState {
  activities: Activity[];
}

const initialState: ActivitiesState = {
  activities: JSON.parse(localStorage.getItem('activities') || '[]'),
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.push(action.payload);
      localStorage.setItem('activities', JSON.stringify(state.activities));
    },
    toggleActivity: (state, action: PayloadAction<string>) => {
      const activity = state.activities.find(a => a.id === action.payload);
      if (activity) {
        activity.completed = !activity.completed;
        localStorage.setItem('activities', JSON.stringify(state.activities));
      }
    },
    deleteActivity: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.filter(a => a.id !== action.payload);
      localStorage.setItem('activities', JSON.stringify(state.activities));
    }
  },
});

export const { addActivity, toggleActivity, deleteActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;