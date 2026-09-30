import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const port = Number(process.env.PORT ?? 3000);
const root = path.resolve(process.env.APP_ROOT ?? "dist");
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
]);

try {
  await access(root);
} catch {
  throw new Error(`Application directory ${root} is missing. Run npm run build first.`);
}

function log(request, statusCode, startedAt) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    method: request.method,
    path: request.url,
    statusCode,
    durationMs: Date.now() - startedAt,
  }));
}

const server = createServer(async (request, response) => {
  const startedAt = Date.now();
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  if (requestUrl.pathname === "/health") {
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ status: "healthy", uptimeSeconds: Math.round(process.uptime()) }));
    log(request, 200, startedAt);
    return;
  }

  const relativePath = requestUrl.pathname === "/" ? "index.html" : requestUrl.pathname.slice(1);
  const filePath = path.resolve(root, relativePath);
  if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== root) {
    response.writeHead(400);
    response.end("Bad request");
    log(request, 400, startedAt);
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) throw new Error("Not a file");
    response.writeHead(200, { "content-type": contentTypes.get(path.extname(filePath)) ?? "application/octet-stream" });
    createReadStream(filePath).pipe(response);
    log(request, 200, startedAt);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    log(request, 404, startedAt);
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`MMAUG pipeline lab listening on http://localhost:${port}`);
});
