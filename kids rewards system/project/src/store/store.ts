import { configureStore } from '@reduxjs/toolkit';
import childrenReducer from './childrenSlice';
import activitiesReducer from './activitiesSlice';
import rewardsReducer from './rewardsSlice';

export const store = configureStore({
  reducer: {
    children: childrenReducer,
    activities: activitiesReducer,
    rewards: rewardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;