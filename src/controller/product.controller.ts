import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  // const products = [{ id: 1, name: "phone", description: "redmi note 12", price : 14000 }];
  const splitUrl = url?.split("/");
  const id =
    splitUrl && splitUrl[1] === "products" ? Number(splitUrl[2]) : null;

  if (url === "/products" && method === "GET") {
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products data retrieved successfully",
        data: products,
      }),
    );
  } else if (method === "GET" && url !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    if (!product) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "products not found",
          data: null,
        }),
      );
      return
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products data retrieved successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    // console.log("Body", body);
    const products = readProduct();
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    // console.log(products)
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products data created successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "products not found",
          data: null,
        }),
      );
    }
    // console.log(products[index]);
    products[index] = { id: products[index].id, ...body };
    insertProduct(products);
    res.writeHead(404, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product updated successfully",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "products not found",
          data: null,
        }),
      );
    }
    products.splice(index, 1);
    // console.log(products);
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products deleted successfully",
        data: null,
      }),
    );
  }
};
