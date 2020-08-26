import React, {Component} from "react";
import {
  Route,
  Switch,
  NavLink
} from "react-router-dom";

import MyLoadoutsView from '../MyLoadoutsView/MyLoadoutsView';
import CreateLoadoutView from '../CreateLoadoutView/CreateLoadoutView';
import CharacterSelectView from '../CharacterSelectView/CharacterSelectView';
import OmolonButton from "../../components/OmolonButton/OmolonButton";
import ls from "../../util/localStorage";

import "./styles.scss";

class LoggedInView extends Component {

  handleLogout() {
    ls.remove("settings.auth");
    window.location.href = "/";
  }

  render() {
    return (
      <div className="content-top">
        <div className="nav">
          <h1 className="stretch">OMOLON</h1>
          <div className="nav-right">
            <NavLink to="/loadouts">My Loadouts</NavLink>
            <NavLink to="/create">Create Loadout</NavLink>
            <NavLink to="/character-select">Change Character</NavLink>
            <OmolonButton to="" text="LOGOUT" onClick={() => this.handleLogout()} />
          </div>
        </div>

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
