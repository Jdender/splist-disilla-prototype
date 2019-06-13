import * as React from 'react';
import { MessageView } from './messages/MessageView';

export const App = () => (
    <section>
        <div>
            <h1>#channel</h1>
        </div>

        <div>
            <MessageView/>
        </div>

        <div>
            <div>TODO Send Message</div>
        </div>
    </section>
);
