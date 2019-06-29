import { render } from 'react-dom';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { createClient } from './createClient';
import { App } from './App';

const client = createClient({
    httpUri: 'http://localhost:8080/graphql',
    wsUri: 'ws://localhost:8080/graphql',
});

const Root = () => (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

render(<Root/>, document.getElementById('app'));
