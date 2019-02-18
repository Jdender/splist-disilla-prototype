import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

export const createApolloClient = (url: string) => {

    const errorLink = onError(({ graphQLErrors, networkError }) => {

        if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const httpLink = new HttpLink({
        uri: url,
        fetch,
        credentials: 'same-origin',
    });

    const link = ApolloLink.from([
        errorLink,
        httpLink,
    ]);

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });

    return client;
};
