const fs = require('fs');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { Client } = require('@frontier/proto-keeper-client');

import { mongoConfiguration } from './configuration/mongoConfiguration';
import userService from './service';

require.extensions['.proto'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8');
};

mongoConfiguration();

const server = new grpc.Server();
const userProto = require('./defs/users.proto');
const client = Client('0.0.0.0:50050');

client.updateProto({
  name: 'userProto',
  version: '0.0.4',
  content: userProto
}, (error, proto) => {
  if (error) {
    // process error
    console.log(error);
  } else {
    fs.writeFileSync('my.proto', proto.content);

    const packageDefinition = protoLoader.loadSync(
      'my.proto',
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      });
    const {users: {UserService: {service: serviceDef}}} = grpc.loadPackageDefinition(packageDefinition);

    server.addService(serviceDef, userService);
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log('Server running at http://localhost:50051');
  }
});
