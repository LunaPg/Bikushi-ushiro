import GbfsClient from 'gbfs-client';
import { Projection } from '../../app/infra/projection';
import { StationInfo } from 'gbfs-client/lib/types';

export class stationService{
  constructor( public Gbgs: GbfsClient, public projection:  Projection){};

  async add(stationId: string){
    try {
      const station: StationInfo  = await this.Gbgs.stationInfo(stationId);
      console.log(station);
      if (!station ) {
        throw new Error('[404] not Found');
      }
      if (station instanceof Array) {
        station.map((one) =>  this.projection.add(one));
      } else {
        this.projection.add(station);}
        return true;
     } catch(e) {
      throw new Error (e);
    }
  }

}  