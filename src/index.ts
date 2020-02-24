import Gbfs from 'gbfs-client';
import StationService from './domain/station/service';
import InMemory from './app/infra/inMemory';

const config = require('../config/myPlaces.json');

const GbfsClient = new Gbfs(config.gbfsUrl);
const inMemory = new InMemory();
const service = new StationService(GbfsClient, inMemory);

export default async function main() {
  try {
    await service.add(config.stations[0].id);
    return true;
  } catch (e) {
    throw new Error(e);
  }
}

main().catch(e => {
  throw e;
});
