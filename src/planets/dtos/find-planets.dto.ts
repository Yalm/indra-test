import { InferType, object, string } from "yup";

const findPlanetsSchema = object({
  name: string().max(255),
  page: string().matches(/^\d+$/, "Must be only digits"),
});

type FindPlanetsDto = InferType<typeof findPlanetsSchema>;

export { findPlanetsSchema, FindPlanetsDto };
