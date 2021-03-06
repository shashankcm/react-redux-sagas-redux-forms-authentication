import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import {  
    checkIndexAuthorization,
    checkWidgetAuthorization,
  } from './lib/check-auth';

import App from './App';
import Login from './login';
import Signup from './signup';
import Widgets from './widgets';


import IndexReducer from './index-reducer';
import IndexSagas from './index-sagas';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
    IndexReducer,
    composeSetup(applyMiddleware(sagaMiddleware)) // allows redux devtools to watch sagas
)

//Begin our Index Saga
sagaMiddleware.run(IndexSagas)


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact onEnter={checkIndexAuthorization(store)} path="/" component={Login}/>
                    <Route exact onEnter={checkIndexAuthorization(store)} path="/" component={Signup}/>
                    <Route exact onEnter={checkIndexAuthorization(store)} path="/" component={Widgets}/>
                    <Route onEnter={checkWidgetAuthorization(store)} path="/login" component={Login} />
                    <Route onEnter={checkWidgetAuthorization(store)} path="/signup" component={Signup} />
                    <Route onEnter={checkWidgetAuthorization(store)} path="/widgets" component={Widgets} />
                </Switch>
            </App>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
