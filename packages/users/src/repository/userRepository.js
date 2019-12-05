import {User} from "../model/userDefinition";

const getUsers = () => {
    return User.findAll();
};

const getUser = (userId) => {
    return User.findOne({userId}).lean();
};

export {
    getUser,
    getUsers
};