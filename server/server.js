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

// POST request to save an item to the inventory collection
app.post('/api/inventory', async (req, res) => {
  try {
    const newItem = new Item({
      item: req.body.item,
    });

    await newItem.save();
    res.status(200).json({ message: 'Item saved to inventory!' });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ message: 'Error saving item to inventory' });
  }
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key' };
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