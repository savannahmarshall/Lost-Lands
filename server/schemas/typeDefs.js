const typeDefs = `
  type User {
    _id: ID!
    username: String!
    password: String!
    inventory: [Item]
  }

  type Item {
    _id: ID!
    name: String!
    description: String!
     image: String! 
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]   # Query to fetch all users (if needed)
    items: [Item]   # Query to fetch all items
    queryMe(userId:ID): User
  }

  type Mutation {
    createUser(username: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
    addItem(ObjectID: ID, name: String!, description: String!, image: String!): User  # Update to include image
  }
`;

module.exports = typeDefs;