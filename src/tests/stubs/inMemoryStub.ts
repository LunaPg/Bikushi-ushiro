import {inMemory} from "../../app/infra/inMemory";
import { SinonSandbox} from 'sinon';

const inMemoryStub =  (sandbox: SinonSandbox) => {
  return {
    add: sandbox.stub(inMemory.prototype,'add'),
  }
};
export {inMemoryStub}