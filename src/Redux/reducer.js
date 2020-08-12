import {combineReducers} from 'redux';
import objectAssignDeep from 'object-assign-deep';

import defaultState from './persistance'

import {
  DASHBOARD_INVALIDATED,
  DASHBOARD_REQUEST_FAILED,
  DASHBOARD_REQUEST_FINISHED,
  DASHBOARD_REQUEST_STARTED,
  LOGIN_FAILED,
  LOGIN_INVALIDATED,
  LOGIN_STARTED,
  LOGIN_SUCCESSFUL,
  SETTINGS_UPDATED
} from './actions';

const login = (state = defaultState.login, action) => {
  switch(action.type) {
    case LOGIN_STARTED:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case LOGIN_SUCCESSFUL:
      return Object.assign({}, state, {
        loading: false,
        token: action.token,
        everLoggedIn: true
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        token: null
      });
    case LOGIN_INVALIDATED:
      return Object.assign({}, state, {
        error: action.reason,
        token: null
      });
    default:
      return state;
  }
};

const dashboard = (state = defaultState.dashboard, action) => {
  switch(action.type) {
    case DASHBOARD_REQUEST_STARTED:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case DASHBOARD_REQUEST_FINISHED:
      return Object.assign({}, state, {
        loading: false,
        data: action.data,
        timestamp: action.timestamp
      });
    case DASHBOARD_REQUEST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    case DASHBOARD_INVALIDATED:
      return Object.assign({}, state, {
        loading: false,
        data: null,
        timestamp: null,
        error: null
      });
    default:
      return state;
  }
};

const settings = (state = defaultState.settings, action) => {
  switch(action.type) {
    case SETTINGS_UPDATED:
      return objectAssignDeep({}, state, action.settings);
    default:
      return state;
  }
};

export default combineReducers({login, dashboard, settings});
