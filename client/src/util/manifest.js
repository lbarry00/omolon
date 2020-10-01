import { get, set } from "idb-keyval";

const axios = require("axios");
const _ = require("lodash");

export default {
  isValidManifest,
  getManifest
}

export async function isValidManifest() {
  let latestManifestUrl = await getManifestUrl();

  return get("destiny-manifest")
    .then(manifest => {
      // if there is an existing manifest, check that it's up to date
      if (manifest) {
        return get("manifest-url")
          .then(url => {
            // current manifest url should match the latest retrieved from the API
            // reason: Bungie has made changes without updating the "version" field in the response
            // checking the URL is better
            if (url === latestManifestUrl) {
              return true;
            }
          })
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    })
}

export async function getManifest() {
  let manifestUrl = await getManifestUrl();
  set("manifest-url", manifestUrl);

  downloadManifest(manifestUrl);
  return;
}

function getManifestUrl() {
  // get the endpoint for retrieving the entire manifest in JSON format
  const settings = {
    method: "get",
    url: "https://www.bungie.net/Platform/Destiny2/Manifest/",
    headers: { "X-API-Key": process.env.REACT_APP_BUNGIE_API_KEY }
  }

  return axios(settings)
    .then(function(response) {
      const data = response.data.Response;

      return "https://www.bungie.net" + data.jsonWorldContentPaths.en;
    })
    .catch(function(error) {
      console.log(error);
    })
}

function downloadManifest(manifestUrl) {
  const settings = {
    method: "get",
    url: manifestUrl
  }

  axios(settings)
    .then(function(response) {
      const manifest = response.data;

      // add each definition individually
      _.forEach(_.keys(manifest), (def) => {
        set(def, manifest[def]);
      })
    })
    .catch(function(error) {
      console.log(error);
    })
}
