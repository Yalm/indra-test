import { AxiosInstance } from "axios";
import { FindPlanetsSwapiResDto } from "../dtos";
import { Planet } from "../entities/planet.entity";

export class PlanetRepository {
  private readonly httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async find(query?: { name: string; page: string }) {
    const { data } = await this.httpClient.get<{
      count: number;
      results: FindPlanetsSwapiResDto[];
    }>("/planets", { params: query });

    return {
      results: data.results.map(
        (res) =>
          new Planet(
            res.climate,
            res.created,
            res.diameter,
            res.edited,
            res.films,
            res.gravity,
            res.name,
            res.orbital_period,
            res.population,
            res.residents,
            res.rotation_period,
            res.surface_water,
            res.terrain,
            res.url
          )
      ),
      count: data.count,
    };
  }
}
