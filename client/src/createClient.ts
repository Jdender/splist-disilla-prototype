import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

export const createClient = ({ httpUri }: CreateClientOptions) => {

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
        uri: httpUri,
    });
    
    const link = ApolloLink.from([
        errorLink,
        httpLink,
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
}
