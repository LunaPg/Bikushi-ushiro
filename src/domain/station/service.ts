import GbfsClient from 'gbfs-client';
// import { Station } from "../../domain/station/entity";

import { Projection } from '../../app/infra/projection';
import { StationInfo } from 'gbfs-client/lib/types';

export class stationService{
  constructor( public Gbgs: GbfsClient, public projection:  Projection){};

  async add(stationId: string){
    try {
      console.log(stationId)
      const station: StationInfo = await this.Gbgs.stationInfo(stationId);
      console.log(station)

      if (!station) {
        throw new Error('[404] not Found');
      }
      this.projection.add(station);
    } catch(e) {
      throw new Error (e);
    }
  }

}   