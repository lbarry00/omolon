import React, {Component} from "react";

class LoggedOutView extends Component {

  handleAuthClick() {
    const BUNGIE_API_KEY = process.env.REACT_APP_BUNGIE_API_KEY;
    const axios = require('axios');

    console.log(BUNGIE_API_KEY);
  }

  render() {
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
          <a href="https://www.bungie.net/en/OAuth/Authorize?client_id=33796&response_type=code">Login</a>
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
