declare module 'migrate-mongo' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function up(db: any, client: any): Promise<string[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function down(db: any, client: any): Promise<string[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function status(db: any): Promise<Array<{ fileName: string; appliedAt: string }>>;
}