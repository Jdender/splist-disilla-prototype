import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

export const createClient = (options: CreateClientOptions) => {

    const errorLink = onError(({ graphQLErrors, networkError }) => {

        if (graphQLErrors) 
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );

        if (networkError) 
            console.log(`[Network error]: ${networkError}`);
    });
    
    const httpLink = new HttpLink({
        uri: options.httpUri,
    });

    const wsLink = new WebSocketLink({
        uri: options.wsUri,
        options: {
            reconnect: true,
        },
    });

    // Use ws if subscription, http for everything else
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );
    
    const link = ApolloLink.from([
        errorLink,
        splitLink,
    ]);

    const cache = new InMemoryCache();
    
    const client = new ApolloClient({
        link,
        cache,
    });

    return client;
};

interface CreateClientOptions {
    httpUri: string;
    wsUri: string;
}
