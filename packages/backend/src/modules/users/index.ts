import { gql } from 'apollo-server';

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

  extend type Query {
    users(): [User!]!
  }

  extend type Mutation {
    userCreate(data: UserInput): User!
    userUpdate(id: ID!, data: UserInput): User!
    userDelete(id: ID!): Boolean
  }
`;

export const resolvers = {
  Query: {
    user: async (_, __, { models }) => {
      return models.user.findMany();
    },
  },
  Mutation: {
    userCreate: async (_, { data }, { models }) => {
      console.log(models, '=======');
    },
  },
};
