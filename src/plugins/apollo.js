import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { logErrorMessages } from '@vue/apollo-util';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: '/subscriptions',
    connectionParams: () => ({
      authToken: localStorage.getItem('token'),
    }),
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    if (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    ) {
      console.log(`Subscribing to ${definition.name?.value ?? 'anonymous'}`);
    }
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const errorLink = onError(error => {
  logErrorMessages(error);
});

const apolloClient = new ApolloClient({
  link: errorLink.concat(splitLink),
  cache: new InMemoryCache({
    possibleTypes: {
      Contract: [
        'EmploymentContract',
        'ManagementForRentContract',
        'ManagementForSaleContract',
        'RentContract',
        'SaleContract',
      ],
    },
  }),
});

export default apolloClient;
