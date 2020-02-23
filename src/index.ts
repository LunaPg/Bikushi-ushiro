import Gbfs from 'gbfs-client';
import StationService from './domain/station/service';
import InMemory from './app/infra/inMemory';

const config = require('../config/myPlaces.json');

const GbfsClient = new Gbfs(config.gbfsUrl);
const inMemory = new InMemory();
const service = new StationService(GbfsClient, inMemory);

async function main() {
  try {
    await service.add(config.stations[0].id);
    console.log();
  } catch (e) {
    throw new Error(e);
  }
}

main().catch(e => {
  throw e;
});
