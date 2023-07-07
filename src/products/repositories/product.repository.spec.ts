import { connectToDatabase } from "../../common/datasource/mysql";
import { Pool } from "mysql2";
import { ProductRepository } from "./product.repository";

describe("ProductRepository", () => {
  let productRepository: ProductRepository;
  let client: Pool;

  beforeAll(() => {
    client = connectToDatabase();
    productRepository = new ProductRepository(client);
  });

  it("should insert a doc into table", async () => {
    const mockProduct = {
      name: "Queso",
      description: "Lorem Ipsum",
    };
    const product = await productRepository.create(mockProduct);

    expect(product.id).toBeGreaterThan(0);
    expect(product.name).toBe(mockProduct.name);
    expect(product.description).toBe(mockProduct.description);
  });

  it("should return only a number", async () => {
    const total = await productRepository.count();
    expect(total).toBeGreaterThanOrEqual(0);
  });

  it("should return only one element", async () => {
    const product = await productRepository.create({
      name: "Queso",
      description: "Lorem Ipsum",
    });
    const products = await productRepository.find({
      where: { "id =": product.id.toString() },
    });
    expect(products.length).toBeGreaterThan(0);
    expect(products.length).toBeLessThan(2);
  });

  it("should return only 5 items", async () => {
    await Promise.all(
      Array.from({ length: 5 }).map(() =>
        productRepository.create({
          name: "Queso",
          description: "Lorem Ipsum",
        })
      )
    );
    const products = await productRepository.find({ limit: 5 });
    expect(products.length).toBe(5);
  });

  it("should be defined", () => {
    expect(productRepository).toBeDefined();
  });
});
