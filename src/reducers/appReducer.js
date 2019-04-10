import {
  GET_APPS,
  GET_APP,
  ADD_APP,
  UPDATE_APP,
  DELETE_APP,
  APPS_LOADING,
  GET_ERROR,
  CANCEL_UPDATE
} from "../actions/types";

const initialState = {
  apps: [],
  loading: false,
  single_app: null,
  isUpdate: false,
  errmsg: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPS:
      // console.log("get apps was called");
      return {
        ...state,
        apps: action.payload,
        loading: false
      };
    case GET_APP:
      // console.log(action.payload);
      return {
        ...state,
        single_app: action.payload,
        isUpdate: true
      };

    case UPDATE_APP:
      return {
        ...state,
        apps: state.apps.map(app => {
          const {
            _id,
            title,
            description_long,
            description_short,
            url,
            repo_url
          } = action.payload;
          if (app._id === _id) {
            app.title = title;
            app.description_long = description_long;
            app.description_short = description_short;
            app.url = url;
            app.repo_url = repo_url;
          }
          return app;
        }),
        isUpdate: false
      };
    case DELETE_APP:
      return {
        ...state,
        apps: state.apps.filter(app => app._id !== action.payload)
      };
    case ADD_APP:
      return {
        ...state,
        apps: [action.payload, ...state.apps]
      };
    case APPS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CANCEL_UPDATE:
      return {
        ...state,
        isUpdate: false
      };
    case GET_ERROR:
      // console.log("the eroor");
      // console.log(action.payload);
      return {
        ...state,
        errmsg: action.payload
      };
    default:
      return state;
  }
}
