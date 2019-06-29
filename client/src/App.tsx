import * as React from 'react';
import { MessageView } from './messages/MessageView';
import { MessageInput } from './messages/MessageInput';

export const App = () => (
    <section>
        <div>
            {/* NOTE: Use <select> for channels when time comes */}
            <h1>#general</h1>
        </div>

        <div>
            <MessageView/>
        </div>

        <div>
            <MessageInput/>
        </div>
    </section>
);
