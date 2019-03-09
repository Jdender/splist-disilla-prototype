import { render } from 'react-dom';
import * as React from 'react';

const App = () => (
    <h1 className='subtitle'>Hello world</h1>
);

render(<App/>, document.getElementById('app'));
