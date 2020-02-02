import {stub} from "sinon";
import {inMemory} from "../../app/infra/inMemory";

const inMemoryStub = {
    add: stub(inMemory.prototype,'add'),
} 


export {inMemoryStub}