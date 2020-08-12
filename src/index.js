import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {compose, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './App';

import * as serviceWorker from './serviceWorker';
import {loadState, saveChangesListener} from './Redux/persistance';
import reducer from './Redux/reducer';
import refreshDashboardWatcher from './Redux/polling';

const sagaMiddleware = createSagaMiddleware();
// noinspection JSUnresolvedVariable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
  )
);

sagaMiddleware.run(refreshDashboardWatcher);
store.subscribe(saveChangesListener(store));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
