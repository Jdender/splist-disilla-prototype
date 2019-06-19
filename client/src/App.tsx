import * as React from 'react';
import { MessageView } from './messages/MessageView';
import { MessageInput } from './messages/MessageInput';

export const App = () => (
    <section>
        <div>
            <h1>#channel</h1>
        </div>

        <div>
            <MessageView/>
        </div>

        <div>
            <MessageInput/>
        </div>
    </section>
);
