import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Child } from '../types';

interface ChildrenState {
  children: Child[];
}

const initialState: ChildrenState = {
  children: JSON.parse(localStorage.getItem('children') || '[]'),
};

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    addChild: (state, action: PayloadAction<Child>) => {
      state.children.push(action.payload);
      localStorage.setItem('children', JSON.stringify(state.children));
    },
    updateChildPoints: (state, action: PayloadAction<{ childId: string; points: number }>) => {
      const child = state.children.find(c => c.id === action.payload.childId);
      if (child) {
        child.points += action.payload.points;
        localStorage.setItem('children', JSON.stringify(state.children));
      }
    },
  },
});

export const { addChild, updateChildPoints } = childrenSlice.actions;
export default childrenSlice.reducer;