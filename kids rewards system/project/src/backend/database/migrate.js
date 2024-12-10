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

// Create tables
await worker.db.exec(`
  CREATE TABLE IF NOT EXISTS children (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    points INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    points INTEGER NOT NULL,
    childId TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    date TEXT NOT NULL,
    FOREIGN KEY (childId) REFERENCES children (id)
  );

  CREATE TABLE IF NOT EXISTS rewards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    points INTEGER NOT NULL,
    childId TEXT NOT NULL,
    claimed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (childId) REFERENCES children (id)
  );
`);

console.log('Database tables created successfully');