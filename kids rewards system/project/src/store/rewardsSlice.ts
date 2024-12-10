import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reward } from '../types';

interface RewardsState {
  rewards: Reward[];
}

const initialState: RewardsState = {
  rewards: JSON.parse(localStorage.getItem('rewards') || '[]'),
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    addReward: (state, action: PayloadAction<Reward>) => {
      state.rewards.push(action.payload);
      localStorage.setItem('rewards', JSON.stringify(state.rewards));
    },
    claimReward: (state, action: PayloadAction<string>) => {
      const reward = state.rewards.find(r => r.id === action.payload);
      if (reward) {
        reward.claimed = true;
        localStorage.setItem('rewards', JSON.stringify(state.rewards));
      }
    },
    deleteReward: (state, action: PayloadAction<string>) => {
      state.rewards = state.rewards.filter(r => r.id !== action.payload);
      localStorage.setItem('rewards', JSON.stringify(state.rewards));
    }
  },
});

export const { addReward, claimReward, deleteReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;