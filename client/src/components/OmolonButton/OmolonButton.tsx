import React, {Component} from "react";

import "./styles.scss"

interface IOmolonButtonProps {
  to: string,
  text: string,
  onClick: () => void;
}

class OmolonButton extends Component<IOmolonButtonProps, {}> {
  render() {
    const to = this.props.to;
    const text = this.props.text;
    const onClick = this.props.onClick;

    return (
      <a className="omolon-button" href={to} onClick={onClick}>
        <img src="./img/omolon-logo-transparent.png" alt=""/>
        <span className="stretch">{text}</span>
      </a>
    )
  }
}

export default OmolonButton;
