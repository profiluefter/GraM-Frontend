import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './App';

import * as serviceWorker from './serviceWorker';
import {loadState, saveChangesListener} from './Redux/persistance';
import reducer from './Redux/reducer';
import refreshDashboardWatcher from './Redux/polling';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({collapsed: true});

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(thunk, sagaMiddleware, loggerMiddleware)
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
