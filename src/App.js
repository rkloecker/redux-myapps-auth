import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import AppList from "./components/AppList";
import AppModal from "./components/AppModal";
import UpdateModal from "./components/UpdateModal";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <AppModal />
            <UpdateModal />
            <AppList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
