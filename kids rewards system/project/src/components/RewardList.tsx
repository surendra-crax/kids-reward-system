import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { claimReward, deleteReward } from '../store/rewardsSlice';
import { updateChildPoints } from '../store/childrenSlice';
import { Gift, Trash } from 'lucide-react';

export const RewardList = () => {
  const rewards = useSelector((state: RootState) => state.rewards.rewards);
  const children = useSelector((state: RootState) => state.children.children);
  const dispatch = useDispatch();

  const handleClaim = (rewardId: string, points: number, childId: string) => {
    const child = children.find(c => c.id === childId);
    if (child && child.points >= points) {
      dispatch(claimReward(rewardId));
      dispatch(updateChildPoints({ childId, points: -points }));
    }
  };

  if (rewards.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No rewards added yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Available Rewards</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => {
          const child = children.find(c => c.id === reward.childId);
          const canClaim = child && child.points >= reward.points && !reward.claimed;

          return (
            <div key={reward.id} className="border p-4 rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{reward.name}</h3>
                    <Gift className="w-6 h-6 text-indigo-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{reward.description}</p>
                  <p className="text-sm font-medium mt-2">
                    For: {child?.name || 'Unknown'}
                  </p>
                  <p className="font-bold text-indigo-600 mt-2">
                    {reward.points} points
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleClaim(reward.id, reward.points, reward.childId)}
                    className={`px-4 py-2 rounded-md ${
                      canClaim
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!canClaim}
                  >
                    {reward.claimed ? 'Claimed' : 'Claim'}
                  </button>
                  <button
                    onClick={() => dispatch(deleteReward(reward.id))}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Trash className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};