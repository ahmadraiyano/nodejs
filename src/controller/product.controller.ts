import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  // const products = [{ id: 1, name: "phone", description: "redmi note 12", price : 14000 }];
  const splitUrl = url?.split("/")
  const id = splitUrl && splitUrl[1] === "products" ? Number(splitUrl[2]) : null

  if (url === "/products" && method === "GET") {
    const products = readProduct()
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products data retrieved successfully",
        data: products,
      }),
    );
  } else if (method === "GET" && url !== null){
    const products = readProduct()
    const product = products.find((p: IProduct)=>p.id === id)
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products data retrieved successfully",
        data: product,
      }),
    );
  }
};
