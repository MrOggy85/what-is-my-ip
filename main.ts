import { getIP } from "https://deno.land/x/get_ip@v2.0.0/mod.ts";
import getNumber from './db.ts';

const server = Deno.listen({ port: 8080 });

async function handle(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const ip = await getIP({ipv6: true});

    const id = await getNumber();

    await requestEvent.respondWith(
      new Response(`Your IP address is <b>${ip}</b> and ${id}`, {
        status: 200,
        headers: { "content-type": "text/html" },
      }),
    );
  }
}

for await (const conn of server) {
  await handle(conn);
}
