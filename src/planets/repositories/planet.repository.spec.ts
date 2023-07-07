import { PlanetRepository } from "./planet.repository";
import { connectToSwapi } from "../../common/datasource/swapi";
import { Planet } from "../entities/planet.entity";

describe("PlanetRepository", () => {
  let planetRepository: PlanetRepository;

  beforeAll(() => {
    planetRepository = new PlanetRepository(connectToSwapi());
  });

  it("should return a structure in spanish", async () => {
    const response = await planetRepository.find();
    expect(response.results[0]).toBeInstanceOf(Planet);
    expect(response.count).toBeGreaterThan(0);
  });

  it("should be defined", () => {
    expect(planetRepository).toBeDefined();
  });
});
