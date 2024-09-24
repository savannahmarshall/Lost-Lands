const { User, Item } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your_secret_key';

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    items: async () => {
      return Item.find({});
    },
    queryMe: async (parent, {userId},context) => {
      const user = await User.findOne({_id:userId})
      return user
    }
  },
  Mutation: {
    createUser: async (parent, { username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token, user };
    },
    addItem: async (parent, { ObjectID, name, description, image }) => {  
      const user = await User.findOneAndUpdate({_id:ObjectID},{$push:{inventory:{name,description,image}}},{runValidators:true,new:true})
      return user;
    },
  },
};

module.exports = resolvers;