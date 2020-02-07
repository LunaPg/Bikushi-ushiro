import {SinonSandbox} from "sinon";
import GbfsClient from "gbfs-client";

const gbfsStub = (sandbox: SinonSandbox) => {
  return {
    stations: sandbox.stub(GbfsClient.prototype, <any>'stations'),
    stationInfo : sandbox.stub(GbfsClient.prototype, 'stationInfo'),
    stationStatus : sandbox.stub(GbfsClient.prototype, 'stationStatus'),
    system : sandbox.stub(GbfsClient.prototype, 'system'),
  }
};
export {gbfsStub}