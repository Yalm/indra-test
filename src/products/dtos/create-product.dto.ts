import { InferType, object, string } from "yup";

const createProductSchema = object({
  name: string().required().max(255),
  description: string().required().max(255),
});

type CreateProductDto = InferType<typeof createProductSchema>;

export { createProductSchema, CreateProductDto };
