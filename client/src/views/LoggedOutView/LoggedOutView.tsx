import React, {Component} from "react";

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

    // get the access token and refresh token
    if (accessCode) {
      /*
        POST https://www.bungie.net/Platform/App/OAuth/Token/ HTTP/1.1
        Authorization: Basic {base64encoded(client-id:client-secret)}
        Content-Type: application/x-www-form-urlencoded

        grant_type=authorization_code&code={auth-code}
      */

      this.setState({"loading": true});

      const axios = require("axios");
      const qs = require("qs");
      const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_OAUTH_CLIENT_SECRET;
      const b64 = btoa(clientId + ":" + clientSecret); // convert to base64 encoded

      console.log("Auth Code: " + accessCode);
      console.log("B64: " + b64);

      const data = qs.stringify({
        "grant_type": "authorization_code",
        "code": accessCode
      })
      const settings = {
        method: "post",
        url: "https://www.bungie.net/Platform/App/OAuth/token/",
        headers: {
          "Authorization": "Basic " + b64,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data
      }

      axios(settings)
      .then(function (response) {
        const data = response.data;
        const now = Date.now(); // epoch, for calculating the expiration timestamps

        let authSettings = {}; // object to store in local storage w/ tokens
        authSettings["membership_id"] = data.membership_id;

        // add auth/refresh tokens to object, plus calculate their expiration timestamps
        if (data.access_token) {
          const accessExpiry = now + (data.expires_in * 1000); // api returns seconds, we convert it to ms for epoch

          authSettings["access_token"] = {
            "token": data.access_token,
            "expires_at": accessExpiry
          }
        }
        if (data.refresh_token) {
          const refreshExpiry = now + (data.refresh_expires_in * 1000);

          authSettings["refresh_token"] = {
            "token": data.refresh_token,
            "expires_at": refreshExpiry
          }
        }
        // set the stuff in local storage, redirect to character select
        const authString = JSON.stringify(authSettings);
        localStorage.setItem("settings.auth", authString);
        window.location.href = "/character-select";
      })
      .catch(function (error) {
        console.log(error);
      });
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
          <h1>Destiny Loadouts</h1>
          <div className="nav-right">
            <a href="#about">About</a>
          </div>
        </nav>
        <div className="auth-box">
          <p><small>Click to Authenticate with Bungie.net</small></p>
          <a href={"https://www.bungie.net/en/OAuth/Authorize?client_id=" + clientId + "&response_type=code"}>Login</a>
        </div>
        <div id="about">
          <h2>What is Destiny Loadouts?</h2>
          <p>Destiny Loadouts is a convenient way to create, equip, and share gear loadouts in <a href="http://destinythegame.com">Destiny 2</a></p>
          <h2>What is a loadout?</h2>
          <p>A loadout is a set of items that can be equipped to a character, including subclasses, armor, weapons, armor mods, weapon mods, ghost shells, sparrows.</p>
        </div>
      </div>
    )
  }
}

export default LoggedOutView;
