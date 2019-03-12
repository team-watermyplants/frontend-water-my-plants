import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

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
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("login handler");
    this.props
      .login({
        username: this.state.credentials.username,
        password: this.state.credentials.password
      })
      .then(res => {
        this.props.history.push("/home");
      });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form style={{ marginTop: 60 }} onSubmit={this.handleSubmit}>
            <h1>Log In</h1>
            <TextField
              hintText="Select a Username"
              floatingLabelText="Username"
              type="text"
              name="username"
              value={this.state.credentials.username}
              onChange={this.handleChanges}
            />
            <br />
            <TextField
              hintText="At Least 5 Characters"
              floatingLabelText="Password"
              type="password"
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChanges}
            />
            <br />

            <RaisedButton onClick={this.handleSubmit} label="Log In" primary={true} style={styles.button} />
            <br />
            <p>
              Don't Have an Account? Sign up <Link to="/sign-up">Here!</Link>
            </p>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default connect(
  null,
  { login }
)(Login);
