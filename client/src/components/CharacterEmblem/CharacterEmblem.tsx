import React, {Component} from "react";

import enums from "../../util/typeEnums.js";
import definitions from "../../util/definitions.js";

import "./styles.scss";

interface ICharacterEmblemProps {
  character: object,
  displayName: string
}
interface ICharacterEmblemState {
  classType: string,
  gender: string,
  race: string
}

class CharacterEmblem extends Component<ICharacterEmblemProps, ICharacterEmblemState> {
  constructor(props) {
    super(props);

    this.state = {
      classType: "",
      gender: "",
      race: ""
    }
  }

  async componentDidMount() {
    const character = this.props.character;
    let classDef = await definitions.getDefinition("DestinyClassDefinition", character["classHash"]);
    let genderDef = await definitions.getDefinition("DestinyGenderDefinition", character["genderHash"]);
    let raceDef = await definitions.getDefinition("DestinyRaceDefinition", character["raceHash"]);

    if (!classDef || !genderDef || !raceDef) {
      console.log("Definitions were not found.");
    } else {
      this.setState({
        classType: classDef.displayProperties.name,
        gender: genderDef.displayProperties.name,
        race: raceDef.displayProperties.name
      })
    }
  }

  render() {
    // for rendering the emblem
    const character = this.props.character;
    const emblemBackground = {
      backgroundImage: "url(https://www.bungie.net" + character["emblem"] + ")"
    }

    // strings will be populated via manifest lookups
    const classType = this.state.classType;
    const gender = this.state.gender;
    const race = this.state.race;

    // show loading if manifest lookups haven't returned yet
    if (!classType || !gender || !race) {
      return (
        <div className="emblem" style={emblemBackground}>
          <div className="left">
            <h3>Loading...</h3>
          </div>
          <p className="light">{character["light"]}</p>
        </div>
      )
    }

    return (
      <div className="emblem" style={emblemBackground}>
        <div className="left">
          <h3>{classType}</h3>
          <p>{gender + " " + race}</p>
        </div>
        <p className="light">{character["light"]}</p>
      </div>
    )
  }
}

export default CharacterEmblem;
