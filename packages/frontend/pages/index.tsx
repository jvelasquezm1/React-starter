import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import dynamic from 'next/dynamic';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache,
});

const BrowserRouter = dynamic(
  () => import('react-router-dom').then((mod) => mod.BrowserRouter),
  {
    ssr: false,
  }
);

const Index: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Index;
