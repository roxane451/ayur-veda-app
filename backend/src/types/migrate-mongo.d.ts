declare module 'migrate-mongo' {
  import { Db, MongoClient } from 'mongodb';

  export function up(db: Db, client: MongoClient): Promise<string[]>;
  export function down(db: Db, client: MongoClient): Promise<string[]>;
  export function status(db: Db): Promise<Array<{ fileName: string; appliedAt: string }>>;
}