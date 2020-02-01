import {stationService} from './domain/station/service';
import {inMemory} from './app/infra/inMemory';
import Gbfs from 'gbfs-client';
const  config = require( '../config/myPlaces.json');

const GbfsClient = new Gbfs(config.gbfsUrl);
const InMemory = new inMemory();
const service = new stationService(GbfsClient, InMemory);

  (async() => {
    try {
      await service.add(config.stations[0].id);
      console.log('test');
    } catch(e){
      throw new Error(e);
    }
})();

