import React, {Component} from "react";
import {
  Route,
  Switch,
  NavLink
} from "react-router-dom";

import MyLoadoutsView from '../MyLoadoutsView/MyLoadoutsView';
import CreateLoadoutView from '../CreateLoadoutView/CreateLoadoutView';
import CharacterSelectView from '../CharacterSelectView/CharacterSelectView';
import ls from "../../util/localStorage";

class LoggedInView extends Component {

  handleLogout() {
    ls.remove("settings.auth");
    window.location.href = "/";
  }

  render() {
    return (
      <div>
        <nav>
          <h1>Destiny Loadouts</h1>
          <div className="nav-right">
            <NavLink to="/loadouts">My Loadouts</NavLink>
            <NavLink to="/create">Create Loadout</NavLink>
            <NavLink to="/character-select">Change Character</NavLink>
            <input type="button" value="Logout" id="logout-button" onClick={() => this.handleLogout()}></input>
          </div>
        </nav>

        <Switch>
          <Route path="/loadouts" component={MyLoadoutsView}></Route>
          <Route path="/create" component={CreateLoadoutView}></Route>
          <Route path="/character-select" component={CharacterSelectView}></Route>
        </Switch>
      </div>
    )
  }
}

export default LoggedInView;
