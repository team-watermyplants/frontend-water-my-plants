import React from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

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

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
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
      console.log(this.state.NewUserInfo)
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
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>sign up</h1>
        <input
          onChange={this.handleChanges}
          type="text"
          name="firstName"
          placeholder="first name"
          value={this.state.NewUserInfo.firstName}
          required
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="lastName"
          placeholder="last name"
          value={this.state.NewUserInfo.lastName}
          required
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="username"
          placeholder="username"
          value={this.state.NewUserInfo.username}
          required
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="password"
          placeholder="password"
          value={this.state.NewUserInfo.password}
          required
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="confirmPassword"
          placeholder="confirm password"
          value={this.state.NewUserInfo.confirmPassword}
          required
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="phoneNumber"
          placeholder="phone number"
          value={this.state.NewUserInfo.phoneNumber}
          required
        />
        <button>Sign Up</button>
      </form>
    );
  }
}

export default connect(
  null,
  { createUser }
)(SignUp);
