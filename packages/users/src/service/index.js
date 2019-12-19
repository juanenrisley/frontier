import { createUser, getUser, getUsers } from '../repository';

export default {
  createUser: async (call, callback) => {
    callback(null, await createUser(call.request));
  },
  getUsers: async (call, callback) => {
    callback(null, await getUsers());
  },
  getUser: async (call, callback) => {
    callback(null, await getUser(call.request.id));
  },
};
