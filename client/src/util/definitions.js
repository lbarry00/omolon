import { get } from "idb-keyval";

const _ = require("lodash");

export default {
  getDefinition
}

async function getDefinition(definitionType, hash) {
  return get(definitionType)
    .then(definition => {
      if (definition) {
        return definition[hash];
      } else {
        return null;
        console.log("Definition not found.");
      }
    })
    .catch(err => {
      console.log(err);
    })
}
