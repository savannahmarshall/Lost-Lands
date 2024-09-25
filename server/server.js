require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path'); 
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');
const Item = require('./models/Item');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB Atlas
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., if you're serving an HTML file)
app.use(express.static('public'));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { JWT_SECRET: process.env.JWT_SECRET };
  },
});

// Add a route to handle the root
app.get('/', (req, res) => {
  // Serve static HTML
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

// Start Apollo Server and Express Server
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
});