import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormPersonalInfo extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form style={{ marginTop: 60 }}>
            <h1>Sign Up</h1>
            <TextField
              autoFocus
              onChange={this.props.handleChanges}
              type="text"
              name="firstName"
              floatingLabelText="first name"
              value={this.props.firstName}
              required
            />
            <TextField
              onChange={this.props.handleChanges}
              type="text"
              name="lastName"
              floatingLabelText="last name"
              value={this.props.lastName}
              required
            />
            <RaisedButton onClick={this.props.nextStep}>next</RaisedButton>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default FormPersonalInfo;
