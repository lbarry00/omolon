import * as mongoose from "mongoose";
import { IItem } from "./item.model";
const Item = mongoose.model("Item").schema;

interface ILoadout  {
  membershipId: Number,
  characterId: number,
  helmet: IItem,
  gauntlets: IItem,
  chestArmor: IItem,
  legArmor: IItem,
  classArmor: IItem,
  kineticWeapons: IItem,
  energyWeapons: IItem,
  powerWeapons: IItem,
  subclass: IItem
}

// membershipId and characterId are required, everything else not
const loadoutSchema = new mongoose.Schema({
  membershipId: {
    type: Number,
    required: true
  },
  characterId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  helmet: {
    type: Item,
    required: false
  },
  gauntlets: {
    type: Item,
    required: false
  },
  chestArmor: {
    type: Item,
    required: false
  },
  legArmor: {
    type: Item,
    required: false
  },
  classArmor: {
    type: Item,
    required: false
  },
  kineticWeapons: {
    type: Item,
    required: false
  },
  energyWeapons: {
    type: Item,
    required: false
  },
  powerWeapons: {
    type: Item,
    required: false
  },
  subclass: {
    type: Item,
    required: false
  }
})

interface ILoadoutModel extends ILoadout, mongoose.Document { };

const Loadout = mongoose.model<ILoadoutModel>('Loadout', loadoutSchema);
export = Loadout;
