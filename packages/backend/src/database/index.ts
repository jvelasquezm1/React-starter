import { MongoClient, Db } from 'mongodb';

let dbInstance: Db;

export async function connectToDatabase(): Promise<Db> {
  if (dbInstance) {
    return dbInstance;
  }

  const client = new MongoClient(process.env.DB_URI);

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(process.env.DB_NAME);
    dbInstance = db;
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
