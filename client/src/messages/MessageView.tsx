import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { IMessage } from 'typings';

export const MessageView = () => {

    const variables = {
        skip: 0,
        take: 100,
    };

    const { data, error, loading } = useQuery(MESSAGE_QUERY, { variables });

    // TODO: Error handle subs by using "system messages"
    useSubscription(MESSAGE_SUBSCRIPTION, {
        onSubscriptionData: ({ client, subscriptionData }) => {

            // Get queried messages
            const cachedMessages = client.readQuery({
                query: MESSAGE_QUERY,
                variables,
            });

            // Update them
            cachedMessages.messages.push(subscriptionData.data.messageSent);

            // Put them back
            client.writeQuery({
                query: MESSAGE_QUERY,
                data: cachedMessages,
                variables,
            });
        }
    });

    // TODO: Better error handling using "system messages"
    if (loading) return <div>Loading...</div>;

    if (error) return <div>Query Error! {error.message}</div>;

    return (
        <ul>
            {data.messages.map((msg: IMessage) => (
                <li key={msg.id}>{msg.content}</li>
            ))}
        </ul>
    );
};

const MESSAGE_QUERY = gql`
    query($skip: Int!, $take: Int!) {
        messages(skip: $skip, take: $take) {
            id
            content
        }
    }
`;

const MESSAGE_SUBSCRIPTION = gql`
    subscription {
        messageSent {
            id
            content
        } 
    }
`;
