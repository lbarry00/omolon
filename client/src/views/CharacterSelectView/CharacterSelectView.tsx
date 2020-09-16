import React, {Component} from "react";

import ls from "../../util/localStorage"
import enums from "../../util/typeEnums.js";
import CharacterEmblem from '../../components/CharacterEmblem/CharacterEmblem';
import "./styles.scss";

const _ = require("lodash");
const axios = require("axios");

interface ICharacterSelectViewState {
  "memberships": object,
  "characters": object,
  "charactersLoading": boolean,
  "displayName": string,
  "selectedMembership": string,
  "selectedMemType": number
}

class CharacterSelectView extends Component<{}, ICharacterSelectViewState> {
  constructor(props) {
    super(props);

    this.state = {
      "memberships": {},
      "characters": {},
      "charactersLoading": false,
      "displayName": "",
      "selectedMembership": "",
      "selectedMemType": -1
    }
  }

  componentDidMount() {
    let mStorage = ls.get("settings.memberships");

    // retrieve membership info if we don't already have it
    if (!mStorage) {
      const auth = ls.get("settings.auth");
      let accessToken = auth.access_token.token;

      const settings = {
        method: "get",
        url: "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "X-API-Key": process.env.REACT_APP_BUNGIE_API_KEY
        }
      }

      const thisObj = this;

      axios(settings)
      .then(function (this: CharacterSelectView, response) {
        const data = response.data.Response;

        let membershipList = {};

        // iterate through each membership obj, extract info we need
        _.forEach(data.destinyMemberships, function(m) {
          membershipList[m.membershipType] = {
            "membershipId": m.membershipId,
            "displayName": m.LastSeenDisplayName
          };
        });

        ls.set("settings.memberships", membershipList);
        thisObj.setState({"memberships": membershipList});
      })
      .catch(function (error) {
        console.log(error);
      })
    } else {
      this.setState({"memberships": mStorage})
    }
  }

  handleSelectMembership(membershipType) {
    const memberships = this.state.memberships;
    const membershipId = memberships[membershipType].membershipId;
    let characters = {};

    // set loading state, save selected membership, reset characters state
    this.setState({
      "charactersLoading": true,
      "selectedMembership": membershipId,
      "selectedMemType": membershipType,
      "characters": {}
    });

    const thisObj = this;

    // 200 = retrieve character data from GetProfile
    const settings = {
      method: "get",
      url: "https://www.bungie.net/Platform/Destiny2/" + membershipType + "/Profile/" + membershipId + "/?components=200",
      headers: {
        "X-API-Key": process.env.REACT_APP_BUNGIE_API_KEY
      }
    }

    axios(settings)
    .then(function (response) {
      const data = response.data.Response.characters.data;

      _.forEach(Object.keys(data), function(charId) {
        characters[charId] = {
          "classType": data[charId].classType,
          "raceType": data[charId].raceType,
          "genderType": data[charId].genderType,
          "light": data[charId].light,
          "emblem": data[charId].emblemBackgroundPath
        }
      });

      thisObj.setState({"characters": characters, "charactersLoading": false, "displayName": memberships[membershipType].displayName});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleSelectCharacter(charId) {
    // save selected in storage
    const profile = {
      "membershipId": this.state.selectedMembership,
      "membershipType": this.state.selectedMemType,
      "characterId": charId
    }
    ls.set("settings.profile", profile);

    window.location.href= "/loadouts";
  }

  render() {

    const memberships = this.state.memberships;
    let mListElement;
    if (Object.keys(memberships).length > 0) {
      mListElement = Object.keys(memberships).map((id) => {
        return (
          <div className="membership" onClick={() => this.handleSelectMembership(id)} key={id}>
            <p className={"membership-type " + enums.getMembershipTypeName(id).toLowerCase()}>{enums.getMembershipTypeName(id)}</p>
            <p className="membership-displayName">{memberships[id].displayName}</p>
          </div>
        )
      })
    } else {
      mListElement = <p>Loading accounts...</p>
    }

    const characters = this.state.characters;
    let cListElement;
    if (Object.keys(characters).length > 0) {
      cListElement = Object.keys(characters).map((id) => {
        return (
          <div onClick={() => this.handleSelectCharacter(id)} key={id}>
            <CharacterEmblem character={characters[id]} displayName={this.state.displayName} />
          </div>
        )
      });
    } else if (this.state.charactersLoading) {
      cListElement = <p>Loading...</p>
    } else {
      cListElement = <p>Select account platform.</p>
    }

    return(
      <div className="character-select-view">
        <h1>Character Select</h1>
        <div className="character-select-top">
          <div className="memberships-list">
            <h2>Bungie.net Linked Platforms</h2>
            {mListElement}
          </div>
          <div className="characters">
            <h2>Characters</h2>
            {cListElement}
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSelectView;
