import { APIGatewayProxyEvent } from "aws-lambda";
import { PlanetsService } from "../services";
import { FindPlanetsDto, findPlanetsSchema } from "../dtos";

export class PlanetsController {
  planetsService: PlanetsService;

  constructor(planetsService: PlanetsService) {
    this.planetsService = planetsService;
  }

  async findAll(query: APIGatewayProxyEvent["queryStringParameters"]) {
    let dto: FindPlanetsDto = null;
    try {
      dto = await findPlanetsSchema.validate(query || {});
    } catch (error) {
      return {
        body: JSON.stringify({ errors: error.errors }),
        statusCode: 400,
      };
    }

    const planets = await this.planetsService.find(dto);

    return {
      body: JSON.stringify(planets),
      statusCode: 200,
    };
  }
}
