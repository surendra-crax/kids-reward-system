import express from 'express';
import childrenRoutes from './routes/children.js';
import activitiesRoutes from './routes/activities.js';
import rewardsRoutes from './routes/rewards.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

// Routes
app.use('/api/children', childrenRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/rewards', rewardsRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});