import * as mongoose from "mongoose";

export interface IItem {
  itemHash: number,
  itemInstanceId: number,
}

const itemSchema = new mongoose.Schema({
  itemHash: {
    type: Number,
    required: true
  },
  itemInstanceId: {
    type: Number,
    required: true
  }
})

interface IItemModel extends IItem, mongoose.Document { };

const Item = mongoose.model<IItemModel>('Item', itemSchema);
export default Item;
