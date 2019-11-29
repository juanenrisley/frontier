const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = `${__dirname}/defs/protos.proto`;
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
const protos = grpc.loadPackageDefinition(packageDefinition).protos;
const Client = (host) => new protos.ProtoService(host, grpc.credentials.createInsecure());

module.exports = Client;
