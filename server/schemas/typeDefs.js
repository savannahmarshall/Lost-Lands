const typeDefs = `
  type User {
    _id: ID!
    username: String!
    password: String!
  }

  type Item {
    _id: ID!
    name: String!
    description: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]   # Query to fetch all users (if needed)
    items: [Item]   # Query to fetch all items
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): AuthPayload
    addItem(name: String!, description: String!): Item  # Mutation to add an item
  }
`;

module.exports = typeDefs;