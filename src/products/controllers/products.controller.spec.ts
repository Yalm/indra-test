import { ProductRepository } from "../repositories/product.repository";
import { connectToDatabase } from "../../common/datasource/mysql";
import { ProductsController } from "./products.controller";
import { ProductsService } from "../services";
import { Pool } from "mysql2";

describe("ProductsController", () => {
  let productRepository: ProductRepository;
  let productsService: ProductsService;
  let productsController: ProductsController;
  let client: Pool;

  beforeAll(async () => {
    client = connectToDatabase();
    productRepository = new ProductRepository(client);
    productsService = new ProductsService(productRepository);
    productsController = new ProductsController(productsService);
  });

  it("should return 400 due to a validation error on the name", async () => {
    const mockProduct = {
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    };
    const { statusCode } = await productsController.create(
      JSON.stringify(mockProduct)
    );
    expect(statusCode).toBe(400);
  });

  it("should return 400 due to a validation error in the description", async () => {
    const mockProduct = {
      name: "Queso",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    };
    const { statusCode } = await productsController.create(
      JSON.stringify(mockProduct)
    );
    expect(statusCode).toBe(400);
  });

  it("should return 400 due to a validation error in the limit", async () => {
    const { statusCode } = await productsController.findAll({
      limit: "asdsddd",
    });
    expect(statusCode).toBe(400);
  });

  it("should return a list of products", async () => {
    const { body, statusCode } = await productsController.findAll({});
    const response = JSON.parse(body);

    expect(Array.isArray(response.results)).toBe(true);
    expect(response.count).toBeGreaterThanOrEqual(0);
    expect(response.next).toBe(
      response.results[response.results.length - 1]?.id
    );
    expect(statusCode).toBe(200);
  });

  it("must return identification", async () => {
    const mockProduct = {
      name: "Queso",
      description: "Lorem Ipsum is simply dummy",
    };
    const { body, statusCode } = await productsController.create(
      JSON.stringify(mockProduct)
    );
    expect(JSON.parse(body).id).toBeGreaterThan(0);
    expect(statusCode).toBe(201);
  });

  it("should be defined", () => {
    expect(productsController).toBeDefined();
  });
});
