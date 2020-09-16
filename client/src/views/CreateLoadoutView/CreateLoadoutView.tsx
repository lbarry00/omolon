import React, { Component } from "react";

import ls from "../../util/localStorage";

const axios = require("axios");

interface ICreateLoadoutViewState {
  "profileError": boolean
}

class CreateLoadoutView extends Component<{}, ICreateLoadoutViewState> {

  constructor(props) {
    super(props);

    this.state = {
      "profileError": false
    }
  }

  componentDidMount() {
    // validate profile
    const profile = ls.get("settings.profile");
    if (!profile) this.setState({"profileError": true});


    const settings = {
      method: "get",
      url: "https://www.bungie.net/Platform/Destiny2/" + profile.membershipType +
            "/Profile/" + profile.membershipId +
            "/Character/" + profile.characterId + "/?components=205", // 205 = Character Equipment
      headers: {
        "X-API-Key": process.env.REACT_APP_BUNGIE_API_KEY
      }
    }

    axios(settings)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  render() {
    // Show error message if the profile was invalid
    if (this.state.profileError) {
      return (
        <div className="create-loadout-view">
          <h1>Create Loadout</h1>
          <h3>Destiny character data may be invalid/missing.</h3>
          <p>Try <a href="/character-select">selecting a character</a>.</p>
        </div>
      )
    }

    return (
      <div className="create-loadout-view">
        <h1>Create Loadout</h1>
      </div>
    )
  }
}

export default CreateLoadoutView;
