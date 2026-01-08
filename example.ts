import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
await client.connect();

type Phone = {
  id: number;
  brand: string;
  model: string;
  slug: string;
};

try {
  const result = await client.query("SELECT * FROM phones");
  const phones: Phone[] = result.rows;
  console.log({ phones });
} catch (error) {
  console.error("Failed to connect to the database", error);
} finally {
  await client.end();
}
