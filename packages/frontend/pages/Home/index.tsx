import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useCallback } from 'react';

const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation userCreate($name: String!, $email: String!) {
    userCreate(data: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

const Home: React.FC = () => {
  const {
    loading: getUsersLoading,
    error: getUsersError,
    data: users,
  } = useQuery(GET_USERS);

  const [createUser, { loading: createUserLoading, error: createUserError }] =
    useMutation(CREATE_USER);

  const handleSubmit = useCallback(async () => {
    const { data } = await createUser({
      variables: { name: 'juan test', email: 'email test' },
    });
    console.log(data.createUser, createUserError, createUserLoading);
  }, [createUser, createUserError, createUserLoading]);

  console.log(users, getUsersLoading, getUsersError, '====');
  return (
    <div>
      <button onClick={handleSubmit}>create user</button>
    </div>
  );
};

export default Home;
