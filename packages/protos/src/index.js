const protoLoader = require('@grpc/proto-loader');

const { GREETER } = require('./proto.enum');

const protoProvider = ((
  protoName,
  options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
) => {
  let packageDefinition;

  try {
    packageDefinition = protoLoader.loadSync(`${__dirname}/defs/${protoName}.proto`, options);
  } catch (e) {
    throw new Error(`Cannot load proto file with name ${protoName}`)
  }

  return packageDefinition;
});

module.exports = {
  [GREETER]: protoProvider(GREETER)
};
