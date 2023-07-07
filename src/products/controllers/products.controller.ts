import { APIGatewayProxyEvent } from "aws-lambda";
import { ProductsService } from "../services";
import {
  CreateProductDto,
  createProductSchema,
  findProductsSchema,
  FindProductsDto,
} from "../dtos";

export class ProductsController {
  productsService: ProductsService;

  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }

  async findAll(query: APIGatewayProxyEvent["queryStringParameters"]) {
    let dto: FindProductsDto = null;
    try {
      dto = await findProductsSchema.validate(query || {});
    } catch (error) {
      return {
        body: JSON.stringify({ errors: error.errors }),
        statusCode: 400,
      };
    }

    const products = await this.productsService.findAndCount(dto);

    return {
      body: JSON.stringify(products),
      statusCode: 200,
    };
  }

  async create(body: APIGatewayProxyEvent["body"]) {
    let dto: CreateProductDto = null;
    try {
      dto = await createProductSchema.validate(body);
    } catch (error) {
      return {
        body: JSON.stringify({ errors: error.errors }),
        statusCode: 400,
      };
    }

    const product = await this.productsService.create(dto);

    return {
      body: JSON.stringify(product),
      statusCode: 201,
    };
  }
}
