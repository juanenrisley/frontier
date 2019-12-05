const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = `${__dirname}/defs/keeper.proto`;
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
const proto = grpc.loadPackageDefinition(packageDefinition).protos;
const Client = (host) => new proto.ProtoService(host, grpc.credentials.createInsecure());

module.exports = {
    Client,
    proto
};
