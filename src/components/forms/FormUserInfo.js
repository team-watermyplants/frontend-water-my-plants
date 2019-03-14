import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export class FormUserInfo extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form style={{ marginTop: 60 }}>
            <h1>Sign Up</h1>
            <TextField
              onChange={this.props.handleChanges}
              type="text"
              name="username"
              floatingLabelText="username"
              value={this.props.username}
              required
            />
            <TextField
              onChange={this.props.handleChanges}
              type="password"
              name="password"
              floatingLabelText="password"
              value={this.props.password}
              required
            />
            <TextField
              onChange={this.props.handleChanges}
              type="password"
              name="confirmPassword"
              floatingLabelText="confirm password"
              value={this.props.confirmPassword}
              required
            />
            <TextField
              onChange={this.props.handleChanges}
              type="text"
              name="phoneNumber"
              floatingLabelText="phone number"
              value={this.props.phoneNumber}
              required
            />
            <RaisedButton onClick={this.props.prevStep}>back</RaisedButton>
            <RaisedButton onClick={this.props.handleSubmit}>
              signUp
            </RaisedButton>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default FormUserInfo;
