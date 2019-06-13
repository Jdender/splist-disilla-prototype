import * as React from 'react';
import { MessageView } from './messages/MessageView';

export const App = () => (
    <section className="hero is-fullheight">
        <div className="hero-head">
            <h1>Header</h1>
        </div>

        <div className="hero-body" style={bodyStyle}>
            <div className="container">
                <MessageView/>
            </div>
        </div>

        <div className="hero-foot">
            <div>Footer</div>
        </div>
    </section>
);

const bodyStyle = {
    height: '0',
    overflow: 'auto',
};
