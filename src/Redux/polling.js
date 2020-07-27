import {call, delay, put, race, select, take} from 'redux-saga/effects';
import {
  DASHBOARD_START_POLLING,
  DASHBOARD_STOP_POLLING,
  dashboardRequestFailed,
  dashboardRequestFinished,
  dashboardRequestStarted,
  loginInvalidated
} from './actions';

function* refreshDashboardWorker() {
  while(true) {
    const {grapi, token} = yield select(state => ({
      grapi: state.settings.grapi,
      token: state.login.token
    }));

    yield put(dashboardRequestStarted());

    const response = yield call(() => {
      return fetch(grapi.host + '/home', {
        method: 'POST',
        body: JSON.stringify({token})
      }).then(response => response.json());
    });

    if(response.success === true) {
      yield put(dashboardRequestFinished(Object.assign({}, response, {success: undefined})));
    } else {
      yield put(loginInvalidated('Token expired'));
      yield put(dashboardRequestFailed(response.error ? response.error : 'An error occurred!'));
    }

    yield delay(grapi.pollingInterval);
  }
}

function* refreshDashboardWatcher() {
  while(true) {
    yield take(DASHBOARD_START_POLLING);
    yield race([
      call(refreshDashboardWorker),
      take(DASHBOARD_STOP_POLLING)
    ]);
  }
}

export default refreshDashboardWatcher;
