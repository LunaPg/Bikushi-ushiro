import { expect } from 'chai';
import { createSandbox } from 'sinon';
import { stationServiceStub } from './stubs';

import main from '../index';

describe('App launch', () => {
  const sandbox = createSandbox();
  let stationStub: any;

  beforeEach(() => {
    stationStub = stationServiceStub.stationServiceStub(sandbox);
  });

  afterEach(() => {
    stationStub = null;
  });

  describe('on launch', () => {
    it('should launch the app', async () => {
      stationStub.add.returns(true);
      const app = await main();
      expect(app).to.equal(true);
    });
  });
});
