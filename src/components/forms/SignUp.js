import React from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const emailIsValid = email => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

class SignUp extends React.Component {
  state = {
    NewUserInfo: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      email: "",
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
      this.state.NewUserInfo.email !== "" &&
      this.state.NewUserInfo.password ==
        this.state.NewUserInfo.confirmPassword &&
      emailIsValid(this.state.NewUserInfo.email)
    ) {
      this.props.createUser(this.state.NewUserInfo)
      .then(() => {
        this.props.history.push('/home')
      })
    }
    this.setState({
      NewUserInfo: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        email: ""
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
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="lastName"
          placeholder="last name"
          value={this.state.NewUserInfo.lastName}
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="username"
          placeholder="username"
          value={this.state.NewUserInfo.username}
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="password"
          placeholder="password"
          value={this.state.NewUserInfo.password}
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="confirmPassword"
          placeholder="confirm password"
          value={this.state.NewUserInfo.confirmPassword}
        />
        <input
          onChange={this.handleChanges}
          type="text"
          name="phoneNumber"
          placeholder="phone number"
          value={this.state.NewUserInfo.phoneNumber}
        />
        <input
          onChange={this.handleChanges}
          type="email"
          name="email"
          placeholder="email"
          value={this.state.NewUserInfo.email}
        />
        <button>sign up</button>
      </form>
    );
  }
}

export default connect(
  null,
  { createUser }
)(SignUp);