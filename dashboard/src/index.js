import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { ContextProver } from './contexts/ContexProvider';

ReactDOM.render(
    <ContextProver>
        <App />,        
    </ContextProver>,
    document.getElementById('root'));