import { Request, Response } from "express";
const _ = require("lodash");
const Item = require("../models/item.model");
const Loadout = require("../models/loadout.model");

exports.getAllLoadouts = function(req: Request, res: Response) {
  Loadout.find()
    .then((loadout: any) => {
      res.status(200).json({
        "loadout": loadout
      })
    })
    .catch((err: any) => {
      res.status(404).json({
        "error": err
      })
    })
}

exports.addLoadout = function(req: Request, res: Response) {
  // start building the loadout
  let loadout = new Loadout({
    membershipId: req.body.membershipId,
    characterId: req.body.characterId
  });

  // loadout name is optional
  if (req.body.name) {
    loadout["name"] = req.body.name;
  }

  // remove so it's just the actual loadout items left in the body
  delete req.body.membershipId;
  delete req.body.characterId;
  delete req.body.name;

  // iterate through the rest of the body and add items
  _.forEach(req.body, function(value: any, key: any) {
    // key: inventory slot of the item
    // value: { itemHash: ########, itemInstanceId: ############### }
    // add item data to loadout in the specific slot
    loadout[key] = {
      itemHash: value.itemHash,
      itemInstanceId: value.itemInstanceId
    }
  });

  // save and respond with success/error
  loadout.save()
    .then((loadout: any) => {
      res.status(201).json({
        "loadout": loadout
      });
    })
    .catch((err: any) => {
      res.status(400).json({
        "error": err
      });
    });
}

exports.getLoadoutsByCharacter = function(req: Request, res: Response) {
  if (!req.body.characterId) {
    res.status(400).json({
      "error": "Missing required parameter in request: characterId"
    })
  }

  Loadout.find({ characterId: req.body.characterId })
    .then((loadouts: any) => {
      res.status(200).json({
        "loadouts": loadouts
      })
    })
    .catch((err: any) => {
      res.status(400).json({
        "error": err
      })
    })
}

exports.getLoadoutsByMembership = function(req: Request, res: Response) {
  if (!req.body.membershipId) {
    res.status(400).json({
      "error": "Missing required parameter in request: membershipId"
    })
  }

  Loadout.find({ membershipId: req.body.membershipId })
    .then((loadouts: any) => {
      res.status(200).json({
        "loadouts": loadouts
      })
    })
    .catch((err: any) => {
      res.status(400).json({
        "error": err
      })
    })
}
