import { SinonSandbox } from 'sinon';
import StationService from '../../domain/station/service';

const stationServiceStub = (sandbox: SinonSandbox) => ({
  add: sandbox.stub(StationService.prototype, 'add'),
  getRemainingBike: sandbox.stub(StationService.prototype, 'getRemainingBike'),
  getStation: sandbox.stub(StationService.prototype, 'getStation'),
});
export default { stationServiceStub };
