import * as React from 'react';
import { useState } from 'react';
import { KeyboardEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

export const MessageInput = () => {

    const sendMessage = useMutation(SEND_MESSAGE);

    const [content, setContent] = useState('');

    return (
        <input 
            // Two way bind
            value={content}
            onChange={e => setContent(e.target.value)}

            onKeyPress={async e => {

                if (e.key !== 'Enter') return; // Run only on enter

                await sendMessage({
                    variables: {
                        data: {
                            content,
                        },
                    },
                });

                setContent(''); // Clear input after
            }}
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
