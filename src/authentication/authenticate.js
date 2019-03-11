import React from "react";
import {Route} from 'react-router-dom';
import ProtectedRoute from '../'

const authenticate = LogInPage => HomePage => class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
          this.setState({ loggedIn: false });
        } else {
          this.setState({ loggedIn: true });
        }
    }

    render() {
        if(this.state.loggedIn) {
            return <Route path='/' component={HomePage} />
        }
        return <ProtectedRoute path='/login' component={LogInPage} />
    }
}

export default authenticate