import { createDbWorker } from 'sql.js-httpvfs';

const workerUrl = new URL('sql.js-httpvfs/dist/sqlite.worker.js', import.meta.url);
const wasmUrl = new URL('sql.js-httpvfs/dist/sql-wasm.wasm', import.meta.url);

const worker = await createDbWorker(
  [
    {
      from: "inline",
      config: {
        serverMode: "full",
        url: "/database.sqlite",
        requestChunkSize: 4096,
      },
    },
  ],
  workerUrl.toString(),
  wasmUrl.toString()
);

export const getChildren = async () => {
  const result = await worker.db.query('SELECT * FROM children');
  return result;
};

export const getChild = async (id) => {
  const result = await worker.db.query('SELECT * FROM children WHERE id = ?', [id]);
  return result[0];
};

export const addChild = async (child) => {
  await worker.db.query(
    'INSERT INTO children (id, name, age, points) VALUES (?, ?, ?, ?)',
    [child.id, child.name, child.age, child.points]
  );
  return { success: true };
};

export const updateChildPoints = async (id, points) => {
  await worker.db.query(
    'UPDATE children SET points = points + ? WHERE id = ?',
    [points, id]
  );
  return { success: true };
};

export const getActivities = async () => {
  const result = await worker.db.query('SELECT * FROM activities');
  return result;
};

export const addActivity = async (activity) => {
  await worker.db.query(
    'INSERT INTO activities (id, name, description, points, childId, completed, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      activity.id,
      activity.name,
      activity.description,
      activity.points,
      activity.childId,
      activity.completed ? 1 : 0,
      activity.date,
    ]
  );
  return { success: true };
};

export const toggleActivity = async (id) => {
  await worker.db.query(
    'UPDATE activities SET completed = NOT completed WHERE id = ?',
    [id]
  );
  return { success: true };
};

export const deleteActivity = async (id) => {
  await worker.db.query('DELETE FROM activities WHERE id = ?', [id]);
  return { success: true };
};

export const getRewards = async () => {
  const result = await worker.db.query('SELECT * FROM rewards');
  return result;
};

export const addReward = async (reward) => {
  await worker.db.query(
    'INSERT INTO rewards (id, name, description, points, childId, claimed) VALUES (?, ?, ?, ?, ?, ?)',
    [
      reward.id,
      reward.name,
      reward.description,
      reward.points,
      reward.childId,
      reward.claimed ? 1 : 0,
    ]
  );
  return { success: true };
};

export const claimReward = async (id) => {
  await worker.db.query('UPDATE rewards SET claimed = 1 WHERE id = ?', [id]);
  return { success: true };
};

export const deleteReward = async (id) => {
  await worker.db.query('DELETE FROM rewards WHERE id = ?', [id]);
  return { success: true };
};