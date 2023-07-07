import { FindPlanetsDto } from "../dtos";
import { PlanetRepository } from "../repositories/planet.repository";

export class PlanetsService {
  planetRepository: PlanetRepository;

  constructor(planetRepository: PlanetRepository) {
    this.planetRepository = planetRepository;
  }

  find(dto: FindPlanetsDto) {
    return this.planetRepository.find(dto);
  }
}
