import { object, string } from "yup";

const findProductsSchema = object({
  nextCursor: string().matches(/^\d+$/, "Must be only digits"),
  prevCursor: string().matches(/^\d+$/, "Must be only digits"),
  limit: string().default("10").matches(/^\d+$/, "Must be only digits"),
});

type FindProductsDto = {
  nextCursor?: string;
  prevCursor?: string;
  limit?: string;
};

export { findProductsSchema, FindProductsDto };
