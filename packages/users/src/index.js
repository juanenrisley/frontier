import {mongoConfiguration} from "./configuration/mongoConfiguration";
import {getUser, getUsers} from "./repository/userRepository";

const fs = require('fs');
const grpc = require('grpc');
const {Client} = require('@frontier/proto-keeper-client');

mongoConfiguration();
const server = new grpc.Server();

require.extensions['.proto'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const userProto = require('./proto/users.proto');

const client = Client('0.0.0.0:50050');
const {content} = client.updateProto({name: 'userProto', version: '0.0.1', content: userProto});
const proto = grpc.loadPackageDefinition(content).users;

server.addService(proto, {
    getUsers: async (call, callback) => {
        callback(null, await getUsers());
    },
    getUser: async (call, callback) => {
        callback(null, await getUser(call.userId));
    },
});


server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://localhost:50051');
server.start();
