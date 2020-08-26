import React, {Component} from "react";

import auth from "../../util/auth";
import OmolonButton from "../../components/OmolonButton/OmolonButton";

import "./styles.scss";

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
        <div className="content-top">
          <div className="nav">
            <h1>OMOLON</h1>
            <div className="nav-right">
              <a href="#about">About</a>
            </div>
          </div>
          <div className="loading">
            <h2>Loading...</h2>
          </div>
        </div>
      )
    }

    // actual homepage
    return (
      <div className="content-top">
        <div className="nav">
          <a href="/"><h1 className="stretch">OMOLON</h1></a>
          <div className="nav-right">
            <a href="#about">ABOUT</a>
          </div>
        </div>
        <div className="auth-box">
          <h2>Create, Equip, and Share Your Loadouts</h2>
          <p>Click to Authenticate with Bungie.net</p>
          <OmolonButton to={"https://www.bungie.net/en/OAuth/Authorize?client_id=" + clientId + "&response_type=code"} text="LOGIN" onClick={()=>{}} />
        </div>
        <div className="about-top">
          <img src="./img/loadout-placeholder.png" alt="A placeholder showing the in-game inventory screen for Destiny 2"/>
          <div className="about-text" id="about">
            <h2>What is Omolon?</h2>
            <p>Omolon is a convenient way to create, equip, and share gear loadouts in <a href="http://destinythegame.com">Destiny 2</a>.</p>
            <h2>What is a loadout?</h2>
            <p>A loadout is a set of items that can be equipped to a character, including subclasses, armor, weapons, armor mods, weapon mods, ghost shells, sparrows.</p>
          </div>
        </div>
        <div className="footer">
          <a href="#about">About</a>
          <a href="https://github.com/laurenbarry00/omolon">Source</a>
          <a href="#">Back to Top</a>
        </div>
      </div>
    )
  }
}

export default LoggedOutView;
