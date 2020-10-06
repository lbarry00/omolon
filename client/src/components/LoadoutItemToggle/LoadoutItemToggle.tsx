import React, {Component} from "react";

import "./styles.scss";

interface IItem{
  name: string,
  icon: string,
  instanceId: string,
  saveToLoadout: boolean
}

interface ILoadoutItemToggleProps {
  item: IItem,
  handleClick: (item: IItem, inventorySlot: string) => void,
  inventorySlot: string
}

class LoadoutItemToggle extends Component<ILoadoutItemToggleProps, {}> {

  render() {
    const item = this.props.item;
    const inventorySlot = this.props.inventorySlot;

    if (item.saveToLoadout) {
      return (
        <div className="loadout-item-toggle" id={item.name} onClick={() => this.props.handleClick(item, inventorySlot)}>
          <img src={item.icon} title={item.name} alt={item.name + " icon"}/>
        </div>
      )
    } else {
      return (
        <div className={"loadout-item-toggle item-toggled-off " + inventorySlot} id={item.name} onClick={() => this.props.handleClick(item, inventorySlot)}>
          <img src={item.icon} title={item.name} alt={item.name + " icon"}/>
        </div>
      )
    }
  }
}

export default LoadoutItemToggle;
