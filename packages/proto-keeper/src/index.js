import {mongoConfiguration} from "./configuration/mongoConfiguration";
import {getProto, updateProtoVersion} from "./repository/protoRepository";

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
const packageDefinition = protoLoader.loadSync(`${__dirname}/protos/keeper.proto`, options);
const packageObject = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

require.extensions['.proto'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

server.addService(packageObject.protos.ProtoService.service, {
    getProto: async (call, callback) => {
        callback(null, await getProto(call.request.name, call.request.version));
    },
    updateProto: async (call, callback) => {
        callback(null, await updateProtoVersion(call.request));
    },
});

server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://localhost:50050');
server.start();
