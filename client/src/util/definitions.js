import { get } from "idb-keyval";

export default {
  getDefinition
}

async function getDefinition(definitionType, hash) {
  return get(definitionType)
    .then(definition => {
      if (definition) {
        return definition[hash];
      } else {
        console.log("Definition not found.");
        return null;
      }
    })
    .catch(err => {
      console.log(err);
    })
}
