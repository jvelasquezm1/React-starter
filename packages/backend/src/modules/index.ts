import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server';
import * as users from './users';

const imports = [users];

const genericTypeDefs = gql`
  enum Sort {
    asc
    desc
  }
`;

export const schema = makeExecutableSchema({
  inheritResolversFromInterfaces: true,
  typeDefs: imports.flatMap((i) => i.typeDefs).concat(genericTypeDefs),
  resolvers: imports.map((i) => i.resolvers),
});
