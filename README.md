# Omolon

Omolon is a tool that lets [Destiny 2](http://destinythegame.com/) players save, equip, and share character loadouts. 


## Project Setup

1. [Install MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/) and ensure mongod is running and working properly.

2. Create an app in the [Bnet API portal](https://www.bungie.net/en/Application).

3. Run `npm install` in both `client/` and `server/` folders.

4. Create `client/.env` file with the following data (from step 2):
```
REACT_APP_OAUTH_CLIENT_ID = ""
REACT_APP_OAUTH_CLIENT_SECRET = ""
REACT_APP_BUNGIE_API_KEY = ""
```

### Startup

Server: `npm run dev`.

Cient: `npm start`.