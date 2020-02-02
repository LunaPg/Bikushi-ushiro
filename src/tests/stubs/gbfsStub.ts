import {stub} from "sinon";
import GbfsClient from "gbfs-client";

const gbfsStub = {
    stations: stub(GbfsClient.prototype, <any>'stations'),
    stationInfo : stub(GbfsClient.prototype, 'stationInfo'),
    stationStatus : stub(GbfsClient.prototype, 'stationStatus'),
    system : stub(GbfsClient.prototype, 'system'),
} 


export {gbfsStub}