import { gql } from 'apollo-server-fastify';
import * as users from './users';

const imports = [users];

const genericTypeDefs = gql`
  enum Sort {
    asc
    desc
  }
`;

export const schema = {
  typeDefs: imports.flatMap((i) => i.typeDefs).concat(genericTypeDefs),
  resolvers: imports.map((i) => i.resolvers),
};
