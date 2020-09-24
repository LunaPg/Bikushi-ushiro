// import { Station } from "../../domain/station/entity";
import { StationInfo } from 'gbfs-client/lib/types';

export interface Projection {
  add(station: StationInfo): boolean;
  get(stationId: string): StationInfo | undefined;
  remove(stationId: string): boolean;
}
