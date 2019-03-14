import React from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FormUserInfo from "./FormUserInfo";
import FormPersonalInfo from "./FormPersonalInfo";

class SignUp extends React.Component {
  state = {
    NewUserInfo: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: ""
    },
    step: 1
  };

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      NewUserInfo: {
        ...this.state.NewUserInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  nextStep = e => {
    e.preventDefault();
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = e => {
    e.preventDefault();
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.NewUserInfo.firstName !== "" &&
      this.state.NewUserInfo.lastName !== "" &&
      this.state.NewUserInfo.username !== "" &&
      this.state.NewUserInfo.password !== "" &&
      this.state.NewUserInfo.confirmPassword !== "" &&
      this.state.NewUserInfo.phoneNumber !== "" &&
      this.state.NewUserInfo.password == this.state.NewUserInfo.confirmPassword
    ) {
      console.log(this.state.NewUserInfo);
      this.props.createUser(this.state.NewUserInfo).then(() => {
        this.props.history.push("/home");
      });
    }
    this.setState({
      NewUserInfo: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        phoneNumber: ""
      }
    });
  };

  render() {
    switch (this.state.step) {
      case 1:
        return (
          <FormPersonalInfo
            nextStep={this.nextStep}
            handleChanges={this.handleChanges}
            firstName={this.state.NewUserInfo.firstName}
            lastName={this.state.NewUserInfo.lastName}
          />
        );
      case 2:
        return (
          <FormUserInfo
            prevStep={this.prevStep}
            handleChanges={this.handleChanges}
            handleSubmit={this.handleSubmit}
            username={this.state.NewUserInfo.username}
            password={this.state.NewUserInfo.password}
            confirmPassword={this.state.NewUserInfo.confirmPassword}
            phoneNumber={this.state.NewUserInfo.phoneNumber}
          />
        );
    }
  }
}

export default connect(
  null,
  { createUser }
)(SignUp);
