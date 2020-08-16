import {dashboardInvalidated, loginFailed, loginInvalidated, loginStarted, loginSuccessful} from "./actions";

export const login = (username, password) => (dispatch, getState) => {
  dispatch(loginStarted());

  let {settings: {grapi: {host}}} = getState();

  return fetch(host + "/auth", {
    method: "POST",
    body: JSON.stringify({username, password})
  })
    .then(response => response.json())
    .then(response => {
      if(response.success === true)
        dispatch(loginSuccessful(response.token));
      else
        dispatch(loginFailed(response.error ? response.error : "Login failed!"));
    });
};

export const logout = () => (dispatch) => {
  dispatch(dashboardInvalidated());
  dispatch(loginInvalidated("Abgemeldet."));
};
