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
import { addapp, updateapp, getapp, cancelUpdate } from "../actions/appActions";
import PropTypes from "prop-types";

class UpdateModal extends Component {
  state = {
    modal: false,
    _id: "",
    title: "",
    description_long: "",
    description_short: "",
    url: "",
    repo_url: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isUpdate: PropTypes.bool,
    single_app: PropTypes.object
  };

  toggle = () => {
    // cancel update, set isUpdate to false
    this.props.cancelUpdate();
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
      _id: this.props.app.single_app._id,
      title: this.state.title,
      description_long: this.state.description_long,
      description_short: this.state.description_short,
      url: this.state.url,
      repo_url: this.state.repo_url
    };

    // Add app via addapp action
    this.props.updateapp(newApp);
    // console.log("new isUpdate");
    console.log(this.props.app.isUpdate);

    // Close modal
    this.toggle();
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // only do something if isUpdate is true and props dont change to preven ininite loop
    if (
      this.props.app.isUpdate &&
      this.props.app.isUpdate !== prevProps.app.isUpdate
    ) {
      // console.log("is update changed!!!!");
      this.setState({
        _id: this.props.app.single_app._id,
        title: this.props.app.single_app.title,
        description_long: this.props.app.single_app.description_long,
        description_short: this.props.app.single_app.description_short,
        url: this.props.app.single_app.url,
        repo_url: this.props.app.single_app.repo_url,
        modal: this.props.app.isUpdate
      });
    }
  }

  render() {
    if (this.props.app.isUpdate) {
      // console.log(this.props.app.single_app);
      return (
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Update App</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  <Label for="description_long">Description</Label>
                  <Input
                    type="text"
                    name="description_long"
                    id="description_long"
                    value={this.state.description_long}
                    onChange={this.onChange}
                  />
                  <Label for="description_short">Used Technologies</Label>
                  <Input
                    type="text"
                    name="description_short"
                    id="description_short"
                    value={this.state.description_short}
                    onChange={this.onChange}
                  />
                  <Label for="url">App Deployment</Label>
                  <Input
                    type="text"
                    name="url"
                    id="url"
                    value={this.state.url}
                    onChange={this.onChange}
                  />
                  <Label for="repo_url">Git repo</Label>
                  <Input
                    type="text"
                    name="repo_url"
                    id="repo_url"
                    value={this.state.repo_url}
                    onChange={this.onChange}
                  />
                  <Button color="success" style={{ marginTop: "2rem" }} block>
                    Update App
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = state => ({
  app: state.app,
  single_app: state.app.single_app,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addapp, updateapp, getapp, cancelUpdate }
)(UpdateModal);
