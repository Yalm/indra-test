import {
  Handler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { ProductsController } from "../controllers";
import { ProductRepository } from "../repositories/product.repository";
import { ProductsService } from "../services";
import { connectToDatabase } from "../../common/datasource/mysql";

export const handler: Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> = async (event) => {
  const db = connectToDatabase();
  const productRepository = new ProductRepository(db);
  const productsService = new ProductsService(productRepository);
  const productsController = new ProductsController(productsService);

  return productsController.create(event.body);
};
