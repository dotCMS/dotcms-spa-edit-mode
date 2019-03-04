import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/css/index.css';

if (window.dotcmsPage) {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            <Router>
                <App payload={window.dotcmsPage} />
            </Router>,
            document.getElementById('root')
        );
    });
} else {
    ReactDOM.render(
        <Router>
            <App />
        </Router>,
        document.getElementById('root')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
