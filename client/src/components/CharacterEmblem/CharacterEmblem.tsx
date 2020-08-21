import React, {Component} from "react";

import enums from "../../util/typeEnums.js";

import "./styles.scss";

interface ICharacterEmblemProps {
  character: object,
  displayName: string
}

class CharacterEmblem extends Component<ICharacterEmblemProps, {}> {
  render() {
    const character = this.props.character;

    const emblemBackground = {
      backgroundImage: "url(https://www.bungie.net" + character["emblem"] + ")"
    }

    return (
      <div className="emblem" style={emblemBackground}>
        <div className="left">
          <h3>{enums.getClassTypeName(character["classType"])}</h3>
          <p>{enums.getGenderName(character["genderType"]) + " " + enums.getRaceName(character["raceType"])}</p>
        </div>
        <p className="light">{character["light"]}</p>
      </div>
    )
  }
}

export default CharacterEmblem;
