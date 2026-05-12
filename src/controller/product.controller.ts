import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const splitUrl = url?.split("/");
  const id =
    splitUrl && splitUrl[1] === "products" ? Number(splitUrl[2]) : null;

  // GET ALL PRODUCTS
  if (url === "/products" && method === "GET") {
    try {
      const products = readProduct();

      return sendResponse(
        res,
        200,
        true,
        "Products retrieved successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }

  // GET SINGLE PRODUCT
  else if (method === "GET" && id !== null) {
    try {
      const products = readProduct();

      const product = products.find((p: IProduct) => p.id === id);

      if (!product) {
        return sendResponse(res, 404, false, "Product not found");
      }

      return sendResponse(
        res,
        200,
        true,
        "Product retrieved successfully",
        product,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }

  // CREATE PRODUCT
  else if (method === "POST" && url === "/products") {
    try {
      const body = await parseBody(req);

      const products = readProduct();

      const newProduct: IProduct = {
        id: Date.now(),
        ...body,
      };

      products.push(newProduct);

      insertProduct(products);

      return sendResponse(
        res,
        201,
        true,
        "Product created successfully",
        newProduct,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }

  // UPDATE PRODUCT
  else if (method === "PUT" && id !== null) {
    try {
      const body = await parseBody(req);

      const products = readProduct();

      const index = products.findIndex((p: IProduct) => p.id === id);

      if (index < 0) {
        return sendResponse(res, 404, false, "Product not found");
      }

      products[index] = {
        id: products[index].id,
        ...body,
      };

      insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product updated successfully",
        products[index],
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }

  // DELETE PRODUCT
  else if (method === "DELETE" && id !== null) {
    try {
      const products = readProduct();

      const index = products.findIndex((p: IProduct) => p.id === id);

      if (index < 0) {
        return sendResponse(res, 404, false, "Product not found");
      }

      products.splice(index, 1);

      insertProduct(products);

      return sendResponse(res, 200, true, "Product deleted successfully", null);
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }

  // ROUTE NOT FOUND
  else {
    return sendResponse(res, 404, false, "Route not found");
  }
};
