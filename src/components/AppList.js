import React, { Component } from "react";
import {
  Spinner,
  ListGroup,
  ListGroupItem,
  Button,
  Collapse
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getapps, getapp, deleteapp, updateapp } from "../actions/appActions";
import PropTypes from "prop-types";

class AppList extends Component {
  static propTypes = {
    getapps: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, clickId: null };
  }

  toggle(id) {
    // if open: close
    if (this.state.collapse) {
      this.setState(state => ({ collapse: false }));
    } else this.setState(state => ({ collapse: true, clickId: id }));
  }

  componentDidMount() {
    this.props.getapps();
  }

  onDeleteClick = id => {
    this.props.deleteapp(id);
  };

  onEditClick = id => {
    this.props.getapp(id);
  };

  render() {
    const { apps, loading, errmsg } = this.props.app;
    const loadingElement = (
      <>
        <Spinner color="secondary" />
        <h3>app is loading</h3>
      </>
    );
    const errorText = <p>{errmsg}</p>;
    // console.log(apps);
    return (
      <>
        {loading ? loadingElement : ""}

        {errmsg ? errorText : ""}
        <TransitionGroup className="">
          {apps.map(
            ({
              _id,
              title,
              description_long,
              description_short,
              url,
              repo_url
            }) => (
              <CSSTransition key={_id} timeout={300} classNames="fade">
                <ListGroup className="mb-2">
                  <ListGroupItem className="text-white text-center bg-dark">
                    {title}{" "}
                    <Button
                      onClick={this.toggle.bind(this, _id)}
                      className="remove-btn float-right"
                      color="info"
                      size="sm"
                    >
                      Show Details
                    </Button>
                    {this.props.isAuthenticated ? (
                      <>
                        <Button
                          className="remove-btn float-right"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          Delete
                        </Button>
                        <Button
                          className="update-btn float-right"
                          color="success"
                          size="sm"
                          onClick={this.onEditClick.bind(this, _id)}
                        >
                          Update
                        </Button>
                      </>
                    ) : null}
                  </ListGroupItem>

                  <Collapse
                    isOpen={this.state.collapse && this.state.clickId === _id}
                  >
                    <ListGroupItem className="text-white bg-secondary">
                      App Description: {description_short}
                    </ListGroupItem>
                    <ListGroupItem className="text-white bg-secondary">
                      Used Technologies : {description_long}
                    </ListGroupItem>
                    <ListGroupItem className="text-white bg-secondary">
                      Git Repo URL: {repo_url}
                    </ListGroupItem>
                    <ListGroupItem className="text-white bg-secondary">
                      Deploy URL: {url}
                    </ListGroupItem>
                  </Collapse>
                </ListGroup>
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getapps, deleteapp, updateapp, getapp }
)(AppList);
