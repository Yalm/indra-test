import {
  Handler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { PlanetsController } from "../controllers";
import { PlanetRepository } from "../repositories/planet.repository";
import { PlanetsService } from "../services";
import { connectToSwapi } from "../../common/datasource/swapi";

export const handler: Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> = async (event) => {
  const planetRepository = new PlanetRepository(connectToSwapi());
  const planetsService = new PlanetsService(planetRepository);
  const planetsController = new PlanetsController(planetsService);

  return planetsController.findAll(event.queryStringParameters);
};
