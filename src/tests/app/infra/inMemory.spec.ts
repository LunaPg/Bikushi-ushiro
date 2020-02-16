import faker from 'faker';
import { expect } from 'chai';
import { StationInfo } from 'gbfs-client/lib/types';
import { InMemory } from '../../../app/infra/inMemory';

describe('inMemory', () => {
  let inMemoryStorage: InMemory;

  beforeEach(() => {
    inMemoryStorage = new InMemory();
  });

  describe('add', () => {
    it('should insert data into map', () => {
      const stationInfo: StationInfo = {
        station_id: '1',
        name: faker.name.firstName(),
        short_name: faker.name.prefix(),
        lat: parseFloat(faker.address.latitude()),
        lon: parseFloat(faker.address.longitude()),
        address: faker.address.streetAddress(),
        cross_street: faker.address.streetName(),
        region_id: faker.random.number(),
        post_code: faker.address.zipCode(),
        rental_methods: [faker.finance.currencyName()],
        capacity: faker.random.number(),
      };
      inMemoryStorage.add(stationInfo);
      expect(inMemoryStorage.get(stationInfo.station_id)).to.deep.equal(stationInfo);
    });
  });
});
