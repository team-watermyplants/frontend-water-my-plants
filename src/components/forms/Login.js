import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .login({
        username: this.state.credentials.username,
        password: this.state.credentials.password
      })
      .then(() => {
        console.log('going home', this.props.history)
        this.props.history.push("/home")
        // window.location.reload()
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>log in</h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={this.state.credentials.username}
          onChange={this.handleChanges}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.credentials.password}
          onChange={this.handleChanges}
        />
        <button>log in</button>
      </form>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
