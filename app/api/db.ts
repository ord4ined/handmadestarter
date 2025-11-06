import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL as string;
if (!connectionString) throw new Error('DATABASE_URL is not set');

export const pool = new Pool({
  connectionString,
  max: 3, // serverless friendly
  ssl: { rejectUnauthorized: false }
});
