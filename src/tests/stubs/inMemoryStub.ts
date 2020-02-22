import { SinonSandbox } from 'sinon';
import InMemory from '../../app/infra/inMemory';

const inMemoryStub = (sandbox: SinonSandbox) => ({
  add: sandbox.stub(InMemory.prototype, 'add'),
  get: sandbox.stub(InMemory.prototype, 'get'),
});
export default { inMemoryStub };
