import {  expect} from 'chai';
import {sandbox as sinonSandbox} from 'sinon';
// import GbfsClient from 'gbfs-client';
import {gbfsStub, inMemoryStub } from "../../stubs";

import { StationInfo } from 'gbfs-client/lib/types';
import faker from "faker";

import { stationService } from '../../../domain/station/service';
// import { fail } from 'assert';

describe('service', () => {
  const sandbox = sinonSandbox.create();
  
  let StationService = new stationService(gbfsStub as any , inMemoryStub as any );

  afterEach( ()=> {
    sandbox.restore();
  }) 
  describe('add', () => {
    it('should return a station successfully',async () => {
      const stationInfo : StationInfo = {
        station_id: "1",
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
      }
      // Have to return ArrayValue because ts
      // method overloading return different type of
      // pormise, could not test it with ts.
      gbfsStub.stationInfo.withArgs().returns(Promise.resolve([stationInfo]));
      inMemoryStub.add.returns(true);
      const res = await StationService.add("1");
      expect(res).to.equal(true);
    });
    it('should throw when statinInfo fail', () => {
      gbfsStub.stationInfo.withArgs().returns(Promise.reject(new Error('fails')));
      // to.be.rejectedWith have issue with ts, 
      // switches to standard promises
       return StationService.add("1").then(value => {
        expect.fail( value, 'Should have vailed, instead returns a value');
       }).catch(e => {
         expect(e).to.be.instanceOf(Error);
       })
    });

  });
});