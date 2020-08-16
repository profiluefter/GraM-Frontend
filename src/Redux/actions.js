export const LOGIN_STARTED = "LOGIN_STARTED";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_INVALIDATED = "LOGIN_INVALIDATED";

export const loginStarted = () => ({type: LOGIN_STARTED});
export const loginSuccessful = token => ({type: LOGIN_SUCCESSFUL, token});
export const loginFailed = error => ({type: LOGIN_FAILED, error});
export const loginInvalidated = reason => ({type: LOGIN_INVALIDATED, reason});

export const DASHBOARD_REQUEST_STARTED = "DASHBOARD_REQUEST_STARTED";
export const DASHBOARD_REQUEST_FINISHED = "DASHBOARD_REQUEST_FINISHED";
export const DASHBOARD_REQUEST_FAILED = "DASHBOARD_REQUEST_FAILED";
export const DASHBOARD_INVALIDATED = "DASHBOARD_INVALIDATED";
export const DASHBOARD_START_POLLING = "DASHBOARD_START_POLLING";
export const DASHBOARD_STOP_POLLING = "DASHBOARD_STOP_POLLING";

export const dashboardRequestStarted = () => ({type: DASHBOARD_REQUEST_STARTED});
export const dashboardRequestFinished = data => ({type: DASHBOARD_REQUEST_FINISHED, data, timestamp: Date.now()});
export const dashboardRequestFailed = error => ({type: DASHBOARD_REQUEST_FAILED, error});
export const dashboardInvalidated = () => ({type: DASHBOARD_INVALIDATED});
export const dashboardStartPolling = () => ({type: DASHBOARD_START_POLLING});
export const dashboardStopPolling = () => ({type: DASHBOARD_STOP_POLLING});

export const SETTINGS_UPDATED = "SETTINGS_UPDATED";
export const settingsUpdated = settings => ({type: SETTINGS_UPDATED, settings});
