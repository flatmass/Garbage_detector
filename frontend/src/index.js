import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './components/utils/ErrorBoundary'
import {ProvideAuth} from "./utils/authContext";

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <ProvideAuth>
                <App />
            </ProvideAuth>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);
