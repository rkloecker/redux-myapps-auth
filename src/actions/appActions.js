import axios from "axios";
import {
  GET_APPS,
  UPDATE_APP,
  GET_APP,
  ADD_APP,
  DELETE_APP,
  APPS_LOADING,
  GET_ERROR,
  CANCEL_UPDATE
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import API_URL from "../apiUrl";

export const getapps = () => dispatch => {
  dispatch(setappsLoading());
  axios
    .get(`${API_URL}apps`)
    .then(res => {
      console.log("get apps was called successfully");
      if (res.data) {
        dispatch({
          type: GET_APPS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log("get apps was called unsuccessfully!!!");
      dispatch({
        type: GET_ERROR,
        payload: "could not load apps from db"
      });
      if (err.response)
        dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getapp = id => dispatch => {
  axios
    .get(`${API_URL}apps/${id}`)
    .then(res => {
      if (res.data) {
        dispatch({
          type: GET_APP,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_ERROR,
          payload: "could not get single app"
        });
      }
    })
    .catch(err => {
      if (err.response)
        dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addapp = app => (dispatch, getState) => {
  axios
    .post(`${API_URL}apps`, app, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_APP,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const updateapp = app => (dispatch, getState) => {
  axios
    .put(`${API_URL}apps/${app._id}`, app, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_APP,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response)
        dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteapp = id => (dispatch, getState) => {
  axios
    .delete(`${API_URL}apps/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_APP,
        payload: id
      })
    )
    .catch(err => {
      if (err.response)
        dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setappsLoading = () => {
  return {
    type: APPS_LOADING
  };
};

export const cancelUpdate = () => {
  return {
    type: CANCEL_UPDATE
  };
};
