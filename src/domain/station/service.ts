import GbfsClient from 'gbfs-client';
import { StationInfo } from 'gbfs-client/lib/types';
import { Projection } from '../../app/infra/projection';

export default class StationService {
  public Gbgs: GbfsClient;

  public projection: Projection;

  constructor(gbfs: GbfsClient, projection: Projection) {
    this.Gbgs = gbfs;
    this.projection = projection;
  }

  async add(stationId: string) {
    try {
      const station: StationInfo = await this.Gbgs.stationInfo(stationId);
      if (!station) {
        throw new Error('[404] not Found');
      }
      this.projection.add(station);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  // Try to get station from API,
  // if fails, check in cache
  async getStation(stationId: string): Promise<StationInfo> {
    const station: StationInfo = await this.Gbgs.stationInfo(stationId);
    if (!station) {
      const cachedStation = this.projection.get(stationId);
      if (!cachedStation) {
        throw new Error('[WARN] Could not get from API or cache');
      }
      return cachedStation;
    }
    this.projection.add(station);
    return station;
  }

  async getRemainingBike(stationId: string): Promise<number> {
    const station = await this.getStation(stationId);
    return station.capacity || 0;
  }
}
