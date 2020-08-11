
# Problem Statement 
[Destiny 2](http://destinythegame.com/) players need a convenient way to save, share, and equip gear loadouts for their characters. Players can move and equip items in-game, and carry items on their character to easily swap gear. While tools such as [DIM](https://destinyitemmanager.com/) exist that allow players to easily move gear between characters and organize their gear within their Vault storage, there is no readily available tool, either in-game or third-party, dedicated to building character loadouts. Players need a way to create and save their loadout "builds", to be equipped later or shared with others. A new interface needs to be developed that allows players to save their currently equipped builds, create new loadouts from their character inventory and Vault, and share loadouts with friends. 

# Overview
Loadout customization consists of subclasses, armor, weapons, armor mods, weapon mods, ghost shells, and sparrows. Additionally, up to one exotic weapon and one exotic armor piece may be equipped at any given time. Players usually use different gear based on what activity they are doing. That is, they may equip different armor, weapons, and mods for PVP activities as opposed to PVE. Characters can carry up to 10 of each item type, with one of these being currently equipped. A player's vault can hold an additional 500 items. In order to change loadouts, players must manually swap their gear and configure mods. This process is time-consuming and vulnerable to human error, as it's easy to forget to equip a piece of gear. 

# Requirements
## User Stories
### Loadout Management
**Loadout**: A loadout is a set of items that can be equipped to a character. 

**Item**: Subclasses, armor, weapons, armor mods, weapon mods, ghost shells, sparrows.

**Storage**: Any location that can contain items possessed by a player. For example, characters' inventories and the Vault.

### Creating Loadouts
* As a user, I can save my currently equipped gear as a loadout.
* As a user, I can choose which items I wish to save in a loadout.
* As a user, I can create a new loadout based on the items I have in storage.
* As a user, I can name my loadouts.
* As a user, I can add tags to my loadouts.
* As a user, I can view the stats of the loadout I'm currently building. 
* As a user, I am alerted when the loadout I'm creating has potential errors and warnings.
* As a user, I can edit one of my previously saved loadouts.
* As a user, I can create a new loadout based on a copy of a previously saved loadout.

### Equipping Loadouts
* As a user, I can equip one of my previously saved loadouts.
* As a user, I can partially equip a loadout by choosing which items I wish to equip.
* As a user, I can equip other players' loadouts that have been shared with me, provided I have the items.

### Sharing and Viewing Loadouts
* As a user, I can view my saved loadouts.
* As a user, I can view my saved loadouts filtering by tags.
* As a user, I can search by name within my saved loadouts.
* As a user, I can delete a loadout.
* As a user, I can share a link to one of my saved loadouts.
* As a user, I can choose whether I want my loadout to be publicly viewable.
* As a user, I can browse loadouts that were created by others.
