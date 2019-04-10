import React, { Component, Fragment } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
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
    const loadingText = <p>... app is loading</p>;
    const errorText = <p>{errmsg}</p>;
    // console.log(apps);
    return (
      <>
        {loading ? loadingText : ""}
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
                  <ListGroupItem className="text-white bg-secondary">
                    {description_short}
                  </ListGroupItem>
                  <ListGroupItem className="text-white bg-secondary">
                    {description_long}
                  </ListGroupItem>
                  <ListGroupItem className="text-white bg-secondary">
                    {repo_url}
                  </ListGroupItem>
                  <ListGroupItem className="text-white bg-secondary">
                    {url}
                  </ListGroupItem>
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
