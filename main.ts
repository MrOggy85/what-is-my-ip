const server = Deno.listen({ port: 8080 });

async function handle(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const ip = requestEvent.request.headers.get('host')

    await requestEvent.respondWith(
      new Response(`Your IP address is <b>${ip}</b>`, {
        status: 200,
        headers: { "content-type": "text/html" },
      }),
    );
  }
}

for await (const conn of server) {
  await handle(conn);
}
