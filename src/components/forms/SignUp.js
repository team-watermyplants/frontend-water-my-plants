import React from "react";
import { connect } from "react-redux";

const emailIsValid = email => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

class SignUp extends React.Component {
  state = {
    NewUserInfo: {
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
      email: ""
    }
  };

  handleChanges = e => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.name === "phone") {
      value = parseInt(value, 10);
    }
    this.setState({
      NewUserInfo: {
        ...this.state.NewUserInfo,
        [e.target.name]: value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.NewUserInfo.username !== "" &&
      this.state.NewUserInfo.password !== "" &&
      this.state.NewUserInfo.confirmPassword !== "" &&
      this.state.NewUserInfo.phone !== "" &&
      this.state.NewUserInfo.email !== "" &&
      this.state.NewUserInfo.password ==
        this.state.NewUserInfo.confirmPassword &&
      emailIsValid(this.state.NewUserInfo.email)
    ) {
      this.props.createUser(this.state.NewUserInfo);
    }
    this.setState({
      NewUserInfo: {
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
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
          type="phone"
          name="phone"
          placeholder="phone number"
          value={this.state.NewUserInfo.phone}
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
  {}
)(SignUp);
