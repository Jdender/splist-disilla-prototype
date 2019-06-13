import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

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
        <div className='list'>
            {data.messages.map((msg: any) => (
                <div key={msg.id} className='list-item'>{msg.content}</div>
            ))}
        </div>
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
