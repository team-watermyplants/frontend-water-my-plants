import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactLoader from 'react-loading';
// import Snackbar from "material-ui/Snackbar";
// import IconButton from "material-ui/IconButton";
// import Button from "material-ui/FlatButton";

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: '',
    },
    loading: false,
    error: false,
    open: true,
  };

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('login handler');
    this.props
      .login({
        username: this.state.credentials.username,
        password: this.state.credentials.password,
      })
      .then(() => {
        this.props.history.push('/');
      });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return this.props.communicating ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '200px',
        }}
      >
        <ReactLoader type="cylon" color="#00796B" height={50} width={50} />
      </div>
    ) : (
      <MuiThemeProvider>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form style={{ marginTop: 60 }} onSubmit={this.handleSubmit}>
            <h1>Log In</h1>
            <TextField
              autoFocus
              autoComplete="false"
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

            <RaisedButton
              type="submit"
              label="Log In"
              primary={true}
              style={styles.button}
            />
            <br />
            <p>
              Don't Have an Account? Sign up <Link to="/sign-up">Here!</Link>
            </p>
          </form>
        </div>

        {/* <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              x
            </IconButton>
          ]}
        /> */}
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15,
  },
};

const mapStateToProps = state => {
  return {
    communicating: state.loginReducer.communicating,
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
