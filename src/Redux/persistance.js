import objectAssignDeep from 'object-assign-deep';
import throttle from 'lodash/throttle';

const defaultState = Object.freeze({
  login: {
    loading: false,
    error: null,
    token: null
  },
  dashboard: {
    loading: false,
    error: null,
    timestamp: null,
    data: null
  },
  settings: {
    grapi: {
      host: 'https://grapi.profiluefter.me',
      pollingInterval: 60000
    }
  }
});
export default defaultState;

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null)
      return undefined;
    let savedState = JSON.parse(serializedState);
    let combinedState = objectAssignDeep({}, defaultState, savedState);
    console.log('Loaded combined state: ', combinedState);
    return combinedState;
  } catch(e) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(e) {
    //Save errors are ignored
  }
};

export let saveChangesListener = store => throttle(() => {
  const currentState = store.getState();
  saveState({
    dashboard: {
      data: currentState.dashboard.data,
      timestamp: currentState.dashboard.timestamp
    },
    login: {
      token: currentState.login.token
    },
    settings: currentState.settings
  });
}, 1000);
