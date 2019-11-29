import {mongoConfiguration} from "./configuration/mongoConfiguration";
import {protoDefinitionRepository} from "./repository/protoDefinition";

const fs = require('fs');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

mongoConfiguration();

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
const packageDefinition = protoLoader.loadSync(`${__dirname}/protos.proto`, options);
const packageObject = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

require.extensions['.proto'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

server.addService(packageObject.protos.ProtoService.service, {
    getProto: (call, callback) => {
        callback(null, protoDefinitionRepository.getProto(call.request.name, call.request.version));
    },
    updateProto: (call, callback) => {
        callback(null, protoDefinitionRepository.updateProtoVersion(call.request));
    },
});

server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://localhost:50050');
server.start();
