import { CreateProductDto, FindProductsDto } from "../dtos";
import { ProductRepository } from "../repositories/product.repository";

export class ProductsService {
  productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async findAndCount(dto: FindProductsDto) {
    const where = {};
    let order = "id DESC";

    if (dto.nextCursor) {
      where["id <"] = dto.nextCursor;
    } else if (dto.prevCursor) {
      where["id >"] = dto.prevCursor;
      order = "id ASC";
    }

    const [results, count] = await Promise.all([
      this.productRepository.find({
        where,
        limit: parseInt(dto.limit, 10),
        order,
      }),
      this.productRepository.count(),
    ]);

    if (dto.prevCursor) {
      results.reverse();
    }

    return {
      results,
      count,
      next: results[results.length - 1]?.id,
      previous: results[0]?.id,
    };
  }

  create(dto: CreateProductDto) {
    return this.productRepository.create(dto);
  }
}
