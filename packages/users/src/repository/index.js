import User from '../model';

const createUser = (user) => {
  return User.create(user);
};

const getUsers = () => {
  return User.find({});
};

const getUser = (id) => {
  return User.findById(id)
    .lean();
};

export {
  createUser,
  getUser,
  getUsers
};
