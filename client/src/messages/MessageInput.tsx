import * as React from 'react';
import { KeyboardEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

export const MessageInput = () => {

    const sendMessage = useMutation(SEND_MESSAGE);

    const onKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key !== 'Enter') return;
        
        await sendMessage({
            variables: {
                data: {
                    content: event.currentTarget.value,
                },
            },
        });

        event.currentTarget.value = '';
    };

    return (
        <input 
            onKeyPress={onKeyPress}
        >
        </input>
    )
};

const SEND_MESSAGE = gql`
    mutation($data: MessageSendInput!) {
        sendMessage(data: $data) {
            id
            content
        }
    }
`;
