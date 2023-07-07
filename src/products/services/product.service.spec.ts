import { connectToDatabase } from "../../common/datasource/mysql";
import { ProductRepository } from "../repositories/product.repository";
import { ProductsService } from "./products.service";

describe("ProductsService", () => {
  let productsService: ProductsService;

  beforeAll(() => {
    const client = connectToDatabase();
    const productRepository = new ProductRepository(client);
    productsService = new ProductsService(productRepository);
  });

  it("should insert a doc into table", async () => {
    const mockProduct = {
      name: "Queso",
      description: "Lorem Ipsum",
    };
    const product = await productsService.create(mockProduct);

    expect(product.id).toBeGreaterThan(0);
    expect(product.name).toBe(mockProduct.name);
    expect(product.description).toBe(mockProduct.description);
  });

  it("should return an object with the results", async () => {
    const response = await productsService.findAndCount({ limit: "10" });

    expect(Array.isArray(response.results)).toBe(true);
    expect(response.count).toBeGreaterThanOrEqual(0);
    expect(response.next).toBe(
      response.results[response.results.length - 1]?.id
    );
    expect(response.previous).toBe(response.results[0]?.id);
  });

  it("should be defined", () => {
    expect(productsService).toBeDefined();
  });
});
