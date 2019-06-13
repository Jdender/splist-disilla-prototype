import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { IMessage } from 'typings';

export const MessageView = () => {

    const { data, error, loading } = useQuery(MESSAGE_QUERY, { 
        variables: { 
            skip: 0, 
            take: 100,
        },
    });

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error! {error.message}</div>;

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
