require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB Atlas
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add the JWT_SECRET to the context if needed
    return { JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key' };
  },
});

// Start Apollo Server
server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
});