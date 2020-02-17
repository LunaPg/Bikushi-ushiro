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
      if (station instanceof Array) {
        station.map(one => this.projection.add(one));
      } else {
        this.projection.add(station);
        return true;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
