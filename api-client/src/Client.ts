import { createApolloClient } from './createApolloClient';
import gql from 'graphql-tag'

export class Client {

    constructor(
        public url: string,
    ) {}

    private apolloClient = createApolloClient(this.url);

    public async getHelloWorld() {

        return this.apolloClient.query({
            query: gql`
                query {
                    hello {
                        id
                        content
                    }
                }
            `,
        });
    }
}
