// import { Station } from "../../domain/station/entity";
import {Projection} from './projection';
import { StationInfo } from 'gbfs-client/lib/types';

export class inMemory implements Projection{
    protected stations = new Map<string, StationInfo>();

    // constructor();

    public add(station: StationInfo)  {
      console.log(station)
        this.stations.set(station.station_id, station);
    }
}
