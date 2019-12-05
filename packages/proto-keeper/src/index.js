import {mongoConfiguration} from "./configuration/mongoConfiguration";
import {getProto, updateProtoVersion} from "./repository/protoRepository";

const fs = require('fs');
const grpc = require('grpc');
const {proto} = require('@frontier/proto-keeper-client');

mongoConfiguration();

const server = new grpc.Server();

require.extensions['.proto'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

server.addService(proto.ProtoService.service, {
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
