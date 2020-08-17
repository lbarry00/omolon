import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LoggedInView from '../../views/LoggedInView/LoggedInView';
import LoggedOutView from '../../views/LoggedOutView/LoggedOutView';

class App extends Component {
  render() {
    return (
      <Router>
         <Switch>
           <Route exact path="/" component={LoggedOutView} />
           <PrivateRoute path="/" component={LoggedInView}/>
         </Switch>
       </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when we have an auth key
    // Otherwise, redirect the user to logged out page
    <Route {...rest} render={props => (
      localStorage.getItem("settings.auth") ?
      <Component {...props} />
      : <Redirect to="/" />
    )} />
  );
};

export default App;
