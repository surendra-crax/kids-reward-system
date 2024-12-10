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

// Sample data
const children = [
  { id: '1', name: 'Alice', age: 8, points: 100 },
  { id: '2', name: 'Bob', age: 10, points: 150 },
];

const activities = [
  {
    id: '1',
    name: 'Clean Room',
    description: 'Make the bed and organize toys',
    points: 20,
    childId: '1',
    completed: false,
    date: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Homework',
    description: 'Complete math homework',
    points: 30,
    childId: '2',
    completed: false,
    date: new Date().toISOString(),
  },
];

const rewards = [
  {
    id: '1',
    name: 'Extra TV Time',
    description: '30 minutes of extra TV time',
    points: 50,
    childId: '1',
    claimed: false,
  },
  {
    id: '2',
    name: 'Video Game Time',
    description: '1 hour of video game time',
    points: 100,
    childId: '2',
    claimed: false,
  },
];

// Insert sample data
for (const child of children) {
  await worker.db.query(
    'INSERT OR REPLACE INTO children (id, name, age, points) VALUES (?, ?, ?, ?)',
    [child.id, child.name, child.age, child.points]
  );
}

for (const activity of activities) {
  await worker.db.query(
    'INSERT OR REPLACE INTO activities (id, name, description, points, childId, completed, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
}

for (const reward of rewards) {
  await worker.db.query(
    'INSERT OR REPLACE INTO rewards (id, name, description, points, childId, claimed) VALUES (?, ?, ?, ?, ?, ?)',
    [
      reward.id,
      reward.name,
      reward.description,
      reward.points,
      reward.childId,
      reward.claimed ? 1 : 0,
    ]
  );
}

console.log('Sample data inserted successfully');