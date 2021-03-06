import faker from 'faker';
import { expect } from 'chai';
import { StationInfo } from 'gbfs-client/lib/types';
import InMemory from '../../../app/infra/inMemory';

describe('inMemory', () => {
  let inMemoryStorage: InMemory;

  beforeEach(() => {
    inMemoryStorage = new InMemory();
  });
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

  describe('add', () => {
    it('should insert data into map', () => {
      const result = inMemoryStorage.add(stationInfo);
      expect(result).to.be.equal(true);
    });
    describe('get', () => {
      beforeEach(() => {
        inMemoryStorage.add(stationInfo);
      });
      it('should get the inserted data', () => {
        expect(inMemoryStorage.get(stationInfo.station_id)).to.deep.equal(stationInfo);
      });
      it('should not get any data', () => {
        expect(inMemoryStorage.get('10')).to.equal(undefined);
      });
    });
    describe('remove', () => {
      beforeEach(() => {
        inMemoryStorage.add(stationInfo);
      });
      it('should remove the inserted data', () => {
        const result = inMemoryStorage.remove(stationInfo.station_id);
        expect(result).to.be.equal(true);
        expect(inMemoryStorage.get(stationInfo.station_id)).to.equal(undefined);
      });
    });
  });
});
