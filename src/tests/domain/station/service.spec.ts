import { expect } from 'chai';
import { createSandbox } from 'sinon';

import { StationInfo } from 'gbfs-client/lib/types';
import faker from 'faker';
import { gbfsStub, inMemoryStub } from '../../stubs';

import StationService from '../../../domain/station/service';

describe('service', () => {
  const sandbox = createSandbox();
  let memoryStub: any;
  let gbfsclientStub: any;
  let stationService: StationService;

  beforeEach(() => {
    // memoryStub = inMemoryStub(sandbox);
    memoryStub = inMemoryStub.inMemoryStub(sandbox);
    gbfsclientStub = gbfsStub.gbfsStub(sandbox);
    stationService = new StationService(gbfsclientStub as any, memoryStub as any);
  });

  afterEach(() => {
    memoryStub = null;
    gbfsclientStub = null;
    sandbox.restore();
  });
  describe('constructor', () => {
    it('should succeed to constuct new object', () => {
      const stationServiceInstance = new StationService(gbfsclientStub as any, memoryStub as any);
      expect(stationServiceInstance).to.be.instanceOf(StationService);
    });
  });

  describe('add', () => {
    it('should add a station successfully', async () => {
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
      gbfsclientStub.stationInfo.withArgs().returns(Promise.resolve(stationInfo));
      memoryStub.add.returns(true);
      const res = await stationService.add('1');
      expect(res).to.equal(true);
    });

    it('should throw when statinInfo fail', () => {
      gbfsclientStub.stationInfo.withArgs().returns(Promise.reject(new Error('fails')));
      // to.be.rejectedWith have issue with ts,
      // switches to standard promises
      return stationService
        .add('1')
        .then(value => {
          expect.fail(value, 'Should have vailed, instead returns a value');
        })
        .catch(e => {
          expect(e).to.be.instanceOf(Error);
        });
    });

    it('should throw a 404 when a station is not found', () => {
      gbfsclientStub.stationInfo.withArgs().returns(Promise.resolve(undefined));

      return stationService
        .add('1')
        .then(value => {
          expect.fail(value, 'Should have vailed, instead returns a value');
        })
        .catch(e => {
          expect(e).to.be.instanceOf(Error);
          expect(e.message).to.be.equal('Error: [404] not Found');
        });
    });
  });

  describe('get', () => {
    it('should get data wghen gbfs find a station', async () => {
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
      gbfsclientStub.stationInfo.withArgs().returns(Promise.resolve(stationInfo));
      memoryStub.add.returns(true);
      const res = await stationService.getStation('1');
      expect(res).to.equal(stationInfo);
    });
    it('should return 404 not found when station does not exists', () => {
      gbfsclientStub.stationInfo.withArgs().returns(Promise.resolve(null));

      // to.be.rejectedWith have issue with ts,
      // switches to standard promises
      return stationService
        .getStation('1')
        .then(value => {
          expect.fail(value, 'Should have vailed, instead returns a value');
        })
        .catch(e => {
          expect(e).to.be.instanceOf(Error);
          expect(e.message).to.be.equal('[WARN] Could not get from API or cache');
        });
    });
    it('should return 404 not found when station does not exists and not found in cache', () => {
      gbfsclientStub.stationInfo.withArgs().returns(Promise.resolve(null));
      memoryStub.get.returns(null);

      // to.be.rejectedWith have issue with ts,
      // switches to standard promises
      return stationService
        .getStation('1')
        .then(value => {
          expect.fail(value, 'Should have vailed, instead returns a value');
        })
        .catch(e => {
          expect(e).to.be.instanceOf(Error);
          expect(e.message).to.be.equal('[WARN] Could not get from API or cache');
        });
    });
    it('should get data from the cache', async () => {
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
      gbfsclientStub.stationInfo.withArgs().returns(Promise.resolve(null));
      memoryStub.get.returns(stationInfo);
      const res = await stationService.getStation('1');
      expect(res).to.equal(stationInfo);
    });

    it('should  resolve if add failed', async () => {
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
      gbfsclientStub.stationInfo.withArgs().returns(Promise.resolve(stationInfo));
      memoryStub.add.returns(new Error('Add fail'));

      const res = await stationService.getStation('1');
      expect(res).to.equal(stationInfo);
    });
  });

  describe('getRemainingBike', () => {
    it('should return remaining Bike', async () => {
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
      gbfsclientStub.stationInfo.withArgs().returns(Promise.resolve(stationInfo));
      memoryStub.add.returns(true);
      const res = await stationService.getRemainingBike('1');
      expect(res).to.equal(stationInfo.capacity);
    });
  });
});
