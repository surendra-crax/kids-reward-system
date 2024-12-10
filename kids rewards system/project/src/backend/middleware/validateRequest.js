import { ValidationError } from '../utils/errors.js';

export const validateChild = (req, res, next) => {
  const { name, age } = req.body;
  
  if (!name || typeof name !== 'string') {
    throw new ValidationError('Name is required and must be a string');
  }
  
  if (!age || typeof age !== 'number' || age < 0) {
    throw new ValidationError('Age is required and must be a positive number');
  }
  
  next();
};

export const validateActivity = (req, res, next) => {
  const { name, points, childId } = req.body;
  
  if (!name || typeof name !== 'string') {
    throw new ValidationError('Name is required and must be a string');
  }
  
  if (!points || typeof points !== 'number' || points < 0) {
    throw new ValidationError('Points is required and must be a positive number');
  }
  
  if (!childId) {
    throw new ValidationError('Child ID is required');
  }
  
  next();
};

export const validateReward = (req, res, next) => {
  const { name, points, childId } = req.body;
  
  if (!name || typeof name !== 'string') {
    throw new ValidationError('Name is required and must be a string');
  }
  
  if (!points || typeof points !== 'number' || points < 0) {
    throw new ValidationError('Points is required and must be a positive number');
  }
  
  if (!childId) {
    throw new ValidationError('Child ID is required');
  }
  
  next();
};