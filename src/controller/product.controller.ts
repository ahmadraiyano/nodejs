import type { IncomingMessage, ServerResponse } from "node:http";

export const productControll = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: "This is products route from controller" }));
};
