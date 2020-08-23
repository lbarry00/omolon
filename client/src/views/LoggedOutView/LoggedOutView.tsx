import React, {Component} from "react";

import auth from "../../util/auth";

interface ILoggedOutViewState {
  loading: boolean
}

class LoggedOutView extends Component<{}, ILoggedOutViewState> {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    // handle oauth2 callback
    // attempt to get the access code for the bungie api
    const urlParams = new URLSearchParams(window.location.search);
    const accessCode = urlParams.get("code");

    if (accessCode) {
      this.setState({"loading": true});

      auth.getOAuthTokensFromCode(accessCode);
    }
  }

  render() {
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

    // don't render the actual homepage if this is the bungie.net oauth callback
    const loadingStatus = this.state.loading;
    if (loadingStatus) {
      return (
        <div>
          <nav>
            <h1>Destiny Loadouts</h1>
            <div className="nav-right">
              <a href="#about">About</a>
            </div>
          </nav>
          <h2>Loading...</h2>
        </div>
      )
    }

    // actual homepage
    return (
      <div>
        <nav>
          <h1>Omolon</h1>
          <div className="nav-right">
            <a href="#about">About</a>
          </div>
        </nav>
        <div className="auth-box">
          <p><small>Click to Authenticate with Bungie.net</small></p>
          <a href={"https://www.bungie.net/en/OAuth/Authorize?client_id=" + clientId + "&response_type=code"}>Login</a>
        </div>
        <div id="about">
          <h2>What is Omolon?</h2>
          <p>Omolon is a convenient way to create, equip, and share gear loadouts in <a href="http://destinythegame.com">Destiny 2</a>.</p>
          <h2>What is a loadout?</h2>
          <p>A loadout is a set of items that can be equipped to a character, including subclasses, armor, weapons, armor mods, weapon mods, ghost shells, sparrows.</p>
        </div>
      </div>
    )
  }
}

export default LoggedOutView;
