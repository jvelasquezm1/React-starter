import { gql } from 'apollo-server-fastify';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input UserInput {
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    health: String!
  }

  type Mutation {
    userCreate(data: UserInput): User!
    userUpdate(id: ID!, data: UserInput): User!
    userDelete(id: ID!): Boolean
  }
`;

export const resolvers = {
  Query: {
    users: async (_, __, { models }) => {
      return models.user.findMany();
    },
    health: () => 'OK',
  },
  Mutation: {
    userCreate: async (_, { data }, { models }) => {
      return await models.user.create({ data });
    },
  },
};
