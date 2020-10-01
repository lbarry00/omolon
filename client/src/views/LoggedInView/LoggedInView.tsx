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
import manifest from "../../util/manifest";

import "./styles.scss";

interface ILoggedInViewState {
  isLoadingManifest: string
}

class LoggedInView extends Component<{}, ILoggedInViewState> {

  constructor(props) {
    super(props);

    this.state = {
      isLoadingManifest: "VALIDATING"
    }
  }

  componentDidMount() {
    this.checkManifest();
  }

  async checkManifest() {
    const thisObj = this;

    let isValidManifest = await manifest.isValidManifest();

    if (isValidManifest) {
      console.log("Manifest already valid.");
      thisObj.setState({ "isLoadingManifest": "FINISHED" });
    } else {
      thisObj.setState({ "isLoadingManifest": "DOWNLOADING" });
      await manifest.getManifest()
      thisObj.setState({ "isLoadingManifest": "FINISHED" });
    }
  }

  handleLogout() {
    ls.remove("settings.auth");
    window.location.href = "/";
  }

  render() {
    const isLoadingManifest = this.state.isLoadingManifest;
    let content; // show either loading screen or actual page contents

    if (isLoadingManifest === "VALIDATING") {
      content =
        <div className="validate-manifest">
          <h1>Validating Destiny Manifest...</h1>
        </div>
    } else if (isLoadingManifest === "DOWNLOADING") {
      content =
        <div className="validate-manifest">
          <h1>Downloading updated Destiny Manifest data...</h1>
        </div>
    } else {
      content =
        <Switch>
          <Route path="/loadouts" component={MyLoadoutsView}></Route>
          <Route path="/create" component={CreateLoadoutView}></Route>
          <Route path="/character-select" component={CharacterSelectView}></Route>
        </Switch>;
    }

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
        {content}
      </div>
    )
  }
}

export default LoggedInView;
