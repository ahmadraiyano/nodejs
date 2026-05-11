import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { handleRoute } from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    handleRoute(req, res);
  },
);
server.listen(5000, () => {
  console.log("server is running on port: 5000");
});
