import { InferType, object, string } from "yup";

const createProductSchema = object({
  name: string().required().max(250),
  description: string().required().max(250),
});

type CreateProductDto = InferType<typeof createProductSchema>;

export { createProductSchema, CreateProductDto };
