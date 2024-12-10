import { Child, Activity, Reward } from '../types';

const API_URL = '/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

// Children API
export const getChildren = () => fetchApi<Child[]>('/children');
export const addChild = (child: Omit<Child, 'id' | 'points'>) => 
  fetchApi<{ success: boolean }>('/children', {
    method: 'POST',
    body: JSON.stringify(child),
  });
export const updateChildPoints = (childId: string, points: number) =>
  fetchApi<{ success: boolean }>(`/children/${childId}/points`, {
    method: 'PATCH',
    body: JSON.stringify({ points }),
  });

// Activities API
export const getActivities = () => fetchApi<Activity[]>('/activities');
export const addActivity = (activity: Omit<Activity, 'id' | 'completed' | 'date'>) =>
  fetchApi<{ success: boolean }>('/activities', {
    method: 'POST',
    body: JSON.stringify(activity),
  });
export const toggleActivity = (activityId: string) =>
  fetchApi<{ success: boolean }>(`/activities/${activityId}/toggle`, {
    method: 'PATCH',
  });
export const deleteActivity = (activityId: string) =>
  fetchApi<{ success: boolean }>(`/activities/${activityId}`, {
    method: 'DELETE',
  });

// Rewards API
export const getRewards = () => fetchApi<Reward[]>('/rewards');
export const addReward = (reward: Omit<Reward, 'id' | 'claimed'>) =>
  fetchApi<{ success: boolean }>('/rewards', {
    method: 'POST',
    body: JSON.stringify(reward),
  });
export const claimReward = (rewardId: string) =>
  fetchApi<{ success: boolean }>(`/rewards/${rewardId}/claim`, {
    method: 'PATCH',
  });
export const deleteReward = (rewardId: string) =>
  fetchApi<{ success: boolean }>(`/rewards/${rewardId}`, {
    method: 'DELETE',
  });