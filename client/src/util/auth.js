import ls from "./localStorage";
import expire from "./expire";

export default {
  getOAuthTokensFromCode,
  getAccessTokenFromRefresh
};

const axios = require("axios");
const qs = require("qs");

// only called when handling the oauth2 callback.
// redirect to character select view afterwards
export function getOAuthTokensFromCode(accessCode) {
  /*
    POST https://www.bungie.net/Platform/App/OAuth/Token/ HTTP/1.1
    Authorization: Basic {base64encoded(client-id:client-secret)}
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code&code={auth-code}
  */

  const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_OAUTH_CLIENT_SECRET;
  const b64 = btoa(clientId + ":" + clientSecret); // convert to base64 encoded

  const data = qs.stringify({
    "grant_type": "authorization_code",
    "code": accessCode
  })
  const settings = {
    method: "post",
    url: "https://www.bungie.net/Platform/App/OAuth/token/",
    headers: {
      "Authorization": "Basic " + b64,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  }

  axios(settings)
  .then(function (response) {
    const data = response.data;

    let authSettings = {}; // object to store in local storage w/ tokens
    authSettings["bnet_membership_id"] = data.membership_id;

    // add auth/refresh tokens to object, plus calculate their expiration timestamps
    if (data.access_token) {
      const accessExpiry = expire.calculateExpireTimestamp(data.expires_in);

      authSettings["access_token"] = {
        "token": data.access_token,
        "expires_at": accessExpiry
      }
    }
    if (data.refresh_token) {
      const refreshExpiry = expire.calculateExpireTimestamp(data.expires_in);

      authSettings["refresh_token"] = {
        "token": data.refresh_token,
        "expires_at": refreshExpiry
      }
    }
    // set the stuff in local storage, redirect to character select
    ls.set("settings.auth", authSettings);
    window.location.href = "/character-select";
  })
  .catch(function (error) {
    console.log(error);
  });
}

// use refresh token to get another access token
export function getAccessTokenFromRefresh() {
  /*
    POST https://www.bungie.net/Platform/App/OAuth/Token/ HTTP/1.1
    Authorization: Basic {base64encoded(client-id:client-secret)}
    Content-Type: application/x-www-form-urlencoded

    grant_type=refresh_token&refresh_token={refresh-token}
  */

  const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_OAUTH_CLIENT_SECRET;
  const b64 = btoa(clientId + ":" + clientSecret); // convert to base64 encoded

  let authSettings = ls.get("settings.auth");
  const refreshToken = authSettings.refresh_token.token;

  const data = qs.stringify({
    "grant_type": "refresh_token",
    "refresh_token": refreshToken
  })
  const settings = {
    method: "post",
    url: "https://www.bungie.net/Platform/App/OAuth/token/",
    headers: {
      "Authorization": "Basic " + b64,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  }

  axios(settings)
  .then(function (response) {
    const data = response.data;

    // add auth/refresh tokens to object, plus calculate their expiration timestamps
    if (data.access_token) {
      const accessExpiry = expire.calculateExpireTimestamp(data.expires_in);

      authSettings["access_token"] = {
        "token": data.access_token,
        "expires_at": accessExpiry
      }
    }
    if (data.refresh_token) {
      const refreshExpiry = expire.calculateExpireTimestamp(data.expires_in);

      authSettings["refresh_token"] = {
        "token": data.refresh_token,
        "expires_at": refreshExpiry
      }
    }
    // set the stuff in local storage, redirect to character select
    ls.set("settings.auth", authSettings);
  })
  .catch(function (error) {
    console.log(error);
  });
}
