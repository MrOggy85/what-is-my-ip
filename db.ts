import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";

async function getNumber() {
  const client = new Client({
    user: "banana",
    password: "tomato",
    database: "test",
    hostname: "oskarlindgren.se",
    port: 6135,
  });
  await client.connect();

  const result = await client.queryArray<Array<number>>("SELECT * FROM hello");
  await client.end();

  return result.rows[0][0];
}

export default getNumber;
