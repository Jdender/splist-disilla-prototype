import { createApolloClient } from './createApolloClient';
import gql from 'graphql-tag';
import { IMessage } from 'typings';

export class Client {

    constructor(
        public url: string,
    ) {}

    private apolloClient = createApolloClient(this.url);

    private getHistoryQuery = gql`
        query($skip: Int!, $take: Int!) {
            messages(skip: $skip, take: $take) {
                id
                content
            }
        }
    `;

    public async getHistory(skip: number, take: number) {

        const result = await this.apolloClient.query({
            query: this.getHistoryQuery,
            variables: {
                skip,
                take,
            },
        });

        if (result.errors) throw result.errors;

        return (result.data as any).messages as IMessage[];
    }

    private sendMessageMutation = gql`
        mutation($data: MessageSendInput!) {
            sendMessage(data: $data) {
                id
                content
            }
        }
    `;

    public async sendMessage(content: string) {

        const result = await this.apolloClient.mutate({
            mutation: this.sendMessageMutation,
            variables: {
                data: {
                    content,
                },
            },
        });

        if (result.errors) throw result.errors;

        return result.data as IMessage;
    }
}
