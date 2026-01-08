import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

const result = await client.query("SELECT * FROM phones");

const phones = result.rows;

console.log({ phones });

await client.end();
