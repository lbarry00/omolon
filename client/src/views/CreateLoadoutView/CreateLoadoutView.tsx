import React, { Component } from "react";
import LoadoutItemToggle from "../../components/LoadoutItemToggle/LoadoutItemToggle";
import OmolonButton from "../../components/OmolonButton/OmolonButton";
import ls from "../../util/localStorage";
import definitions from "../../util/definitions.js";
import "./styles.scss";

const axios = require("axios");
const _ = require("lodash");

interface ICreateLoadoutViewState {
  profileError: boolean,
  inventory: object,
  loadedItems: number
}

class CreateLoadoutView extends Component<{}, ICreateLoadoutViewState> {

  constructor(props) {
    super(props);

    this.state = {
      profileError: false,
      inventory: {},
      loadedItems: 0
    }
  }

  componentDidMount() {
    const thisObj = this;

    // validate profile
    const profile = ls.get("settings.profile");
    if (!profile) this.setState({"profileError": true});


    // retrieve player's currently equipped items
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

        // list of equipped items
        const equippedItems = response.data.Response.equipment.data.items;
        thisObj.lookupInventory(equippedItems)
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  lookupInventory(equippedItems) {
    const thisObj = this;
    let inventory = {};

    let inventorySize = 0; // for counting how many items have been processed, since forEach is async
    _.forEach(equippedItems, async function(item) {

      let bucket = await definitions.getDefinition("DestinyInventoryBucketDefinition", item["bucketHash"]);
      bucket = bucket.displayProperties.name; // name of the inventory slot the item is in

      // skip anything that's not armor, weapons, or subclass
      if (bucket === "Ghost" || bucket === "Vehicle" || bucket === "Ships" || bucket === "Clan Banners"
          || bucket === "Emblems" || bucket === "Finishers" || bucket === "Emotes" || bucket === "Seasonal Artifact") {
          return;
      }

      // get item info
      let itemData = await definitions.getDefinition("DestinyInventoryItemLiteDefinition", item["itemHash"]);

      // format for easier names to handle
      bucket = bucket.toLowerCase();
      bucket = bucket.replace(" ", "-");

      inventory[bucket] = {
        "icon": "https://www.bungie.net" + itemData.displayProperties.icon,
        "name": itemData.displayProperties.name,
        "instanceId": item.itemInstanceId,
        "saveToLoadout": true
      }
      inventorySize++;

      // all items have been processed and added to inventory
      // update state to trigger re-render and display the stuff
      if (inventorySize === 9) {
        thisObj.setState({ inventory: inventory, loadedItems: 9});
      } else {
        thisObj.setState({loadedItems: inventorySize});
      }
    });
  }

  handleToggleItem(item, inventorySlot) {
    // toggle whether the item should be saved to the loadout
    item.saveToLoadout = !item.saveToLoadout;

    // save in state
    let inventory = this.state.inventory;
    inventory[inventorySlot] = item;
    this.setState({inventory: inventory});
  }

  handleSave() {
    const inventory = this.state.inventory;

    _.forEach(inventory, function(item) {
      if (item.saveToLoadout) {
        console.log("Saving " + item.name);
      } else {
        console.log("Excluding " + item.name);
      }
    })
  }

  render() {
    const inventory = this.state.inventory;

    // Show error message if the profile was invalid
    if (this.state.profileError) {
      return (
        <div className="create-loadout-view">
          <h1>Create Loadout</h1>
          <h3>Destiny character data may be invalid/missing.</h3>
          <p>Try <a href="/character-select">selecting a character</a>.</p>
        </div>
      )
    } else if (_.isEmpty(inventory)) {
      const loadedItems = this.state.loadedItems;
      return (
        <div className="create-loadout-view">
          <h1>Create Loadout</h1>
          <div className="retrieving-items">
            <h3>Retrieving currently equipped items...</h3>
            <h3>Retrieved {loadedItems}/9 items</h3>
          </div>
        </div>
      )
    }

    const leftList = [ "subclass", "kinetic-weapons", "energy-weapons", "power-weapons" ];
    const rightList = [ "helmet", "gauntlets", "chest-armor", "leg-armor", "class-armor" ];

    // form the left and right sides
    // inventory icons that toggle whether they're included in the loadout onclick
    const leftInventory = leftList.map((inventorySlot) =>
      <LoadoutItemToggle item={inventory[inventorySlot]} inventorySlot={inventorySlot} key={inventorySlot}
        handleClick={() => this.handleToggleItem(inventory[inventorySlot], inventorySlot)} />
    );
    const rightInventory = rightList.map((inventorySlot) =>
      <LoadoutItemToggle item={inventory[inventorySlot]} inventorySlot={inventorySlot} key={inventorySlot}
        handleClick={() => this.handleToggleItem(inventory[inventorySlot], inventorySlot)} />
    );

    // same but with item names. conditionally add a class w/ strikethrough for the items not excluded
    const namesLeft = leftList.map(function (inventorySlot) {
      if (!inventory[inventorySlot].saveToLoadout) {
        return <p className="excluded" key={inventorySlot}>{inventory[inventorySlot].name}</p>
      } else {
        return <p key={inventorySlot}>{inventory[inventorySlot].name}</p>
      }
    });
    const namesRight = rightList.map(function (inventorySlot) {
      if (!inventory[inventorySlot].saveToLoadout) {
        return <p className="excluded" key={inventorySlot}>{inventory[inventorySlot].name}</p>
      } else {
        return <p key={inventorySlot}>{inventory[inventorySlot].name}</p>
      }
    });

    return (
      <div className="create-loadout-view">
        <h1>Create Loadout</h1>
        <div className="equipped-items">
          <div className="left">
            {leftInventory}
          </div>
          <div className="right">
            {rightInventory}
          </div>
          <div className="create-loadout-info">
            <h2>Information</h2>
            <p>Click an icon to exclude the item from the loadout. Click again to include it.</p>
            <div className="loadout-item-list">
              <div className="left">
                <h4>Weapons</h4>
                {namesLeft}
              </div>
              <div className="right">
                <h4>Armor</h4>
                {namesRight}
              </div>
            </div>
            <OmolonButton to="#" text="SAVE LOADOUT" onClick={() => this.handleSave()} />
          </div>
        </div>
      </div>
    )
  }
}

export default CreateLoadoutView;
