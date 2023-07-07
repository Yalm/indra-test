import type { OkPacket, Pool } from "mysql2";
import { Product } from "../entities/product.entity";

export class ProductRepository {
  private readonly db: Pool;
  private readonly tableName = "products";

  constructor(db: Pool) {
    this.db = db;
  }

  count(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT COUNT(*) as total FROM ${this.tableName}`,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res[0].total);
          }
        }
      );
    });
  }

  find(options?: {
    limit?: number;
    order?: string;
    where?: Record<string, string>;
  }): Promise<Product[]> {
    let query = `SELECT * FROM ${this.tableName}`;
    const values = [];

    if (options.where && Object.keys(options.where).length > 0) {
      query += ` WHERE ${Object.keys(options.where)
        .map((key) => `${key} ?`)
        .join("AND ")}`;
      Object.values(options.where).forEach((value) => values.push(value));
    }

    if (options.order) {
      query += ` ORDER BY ${options.order}`;
    }

    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }

    return new Promise((resolve, reject) => {
      this.db.query(query, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res as Product[]);
        }
      });
    });
  }

  create(product: Partial<Product>): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.db.query(
        `INSERT INTO ${this.tableName} SET ?`,
        product,
        (err, row: OkPacket) => {
          if (err) {
            reject(err);
          } else {
            product.id = row.insertId;
            resolve(product as Product);
          }
        }
      );
    });
  }
}
