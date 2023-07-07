import { PlanetsService } from "../services";
import { PlanetsController } from "./planets.controller";
import { PlanetRepository } from "../repositories/planet.repository";
import { connectToSwapi } from "../../common/datasource/swapi";

describe("PlanetsController", () => {
  let planetsController: PlanetsController;

  beforeAll(() => {
    const planetRepository = new PlanetRepository(connectToSwapi());
    const planetsService = new PlanetsService(planetRepository);
    planetsController = new PlanetsController(planetsService);
  });

  it("should return 400 due to a validation error in the page", async () => {
    const { statusCode } = await planetsController.findAll({
      page: "asdsddd",
    });
    expect(statusCode).toBe(400);
  });

  it("should return a list of planets", async () => {
    const { body, statusCode } = await planetsController.findAll({});
    const response = JSON.parse(body);

    expect(Array.isArray(response.results)).toBe(true);
    expect(response.count).toBeGreaterThanOrEqual(0);
    expect(statusCode).toBe(200);
  });

  it("should be defined", () => {
    expect(planetsController).toBeDefined();
  });
});
