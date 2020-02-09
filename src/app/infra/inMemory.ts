import {Projection} from './projection';
import { StationInfo } from 'gbfs-client/lib/types';

export class inMemory implements Projection{
    public stations = new Map<string, StationInfo>();

    public add(station: StationInfo)  { 
      this.stations.set(station.station_id, station);
      return true;  
    }

    public get(stationId: string): StationInfo | undefined{
      return this.stations.get(stationId);
    }
}
