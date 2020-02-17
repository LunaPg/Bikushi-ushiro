import { SinonSandbox } from 'sinon';
import InMemory from '../../app/infra/inMemory';

const inMemoryStub = (sandbox: SinonSandbox) => ({
  add: sandbox.stub(InMemory.prototype, 'add'),
});
export default { inMemoryStub };
