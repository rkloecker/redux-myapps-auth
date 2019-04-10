import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addapp } from "../actions/appActions";
import PropTypes from "prop-types";

class AppModal extends Component {
  state = {
    modal: false,
    name: "",
    title: "",
    description_long: "",
    description_short: "",
    url: "",
    repo_url: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newApp = {
      title: this.state.title,
      description_long: this.state.description_long,
      description_short: this.state.description_short,
      url: this.state.url,
      repo_url: this.state.repo_url
    };

    // Add app via addapp action
    this.props.addapp(newApp);

    // Close modal
    this.toggle();
  };

  render() {
    // console.log(this.props);
    // dont show until loading is finished
    if (this.props.app.loading) {
      return null;
    }
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add App
          </Button>
        ) : (
          <h4 className="mb-3">Please log in to add, edit, delete apps</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            className="text-dark text-center bg-light"
            toggle={this.toggle}
          >
            Add To App List
          </ModalHeader>
          <ModalBody className="modalbody">
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Add title"
                  onChange={this.onChange}
                />
                <Label for="description_long">Description</Label>
                <Input
                  type="text"
                  name="description_long"
                  id="description_long"
                  placeholder="Add description_long"
                  onChange={this.onChange}
                />
                <Label for="description_short">Used technologies</Label>
                <Input
                  type="text"
                  name="description_short"
                  id="description_short"
                  placeholder="Add description_short"
                  onChange={this.onChange}
                />
                <Label for="url">App Deployment</Label>
                <Input
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Add url"
                  onChange={this.onChange}
                />
                <Label for="repo_url">Git repo</Label>
                <Input
                  type="text"
                  name="repo_url"
                  id="repo_url"
                  placeholder="Add repo_url"
                  onChange={this.onChange}
                />
                <Button color="primary" style={{ marginTop: "2rem" }} block>
                  Add App
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addapp }
)(AppModal);
