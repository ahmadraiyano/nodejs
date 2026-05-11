import type { IncomingMessage, ServerResponse } from "node:http";
import { productControll } from "../controller/product.controller";

export const handleRoute = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route" }));
  } else if (url?.startsWith("/products")) {
    productControll(req,res)
    
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "route not found" }));
  }
};
