import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  // const products = [{ id: 1, name: "phone", description: "redmi note 12", price : 14000 }];

  if (url === "/products" && method === "GET") {
    const products = readProduct()
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products data retrieved successfully",
        data: products,
      }),
    );
  }
};
