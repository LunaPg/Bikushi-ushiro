import { StationInfo } from 'gbfs-client/lib/types';
import { Projection } from './projection';

export default class InMemory implements Projection {
  public stations = new Map<string, StationInfo>();

  public add(station: StationInfo) {
    this.stations.set(station.station_id, station);
    return true;
  }

  public get(stationId: string): StationInfo | undefined {
    return this.stations.get(stationId);
  }
}
