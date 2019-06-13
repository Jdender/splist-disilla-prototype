import * as React from 'react';
import { KeyboardEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

export const MessageSend = () => {

    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key !== 'Enter') return;

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
