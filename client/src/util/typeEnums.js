export default {
  getMembershipTypeName,
  getClassTypeName,
  getRaceName,
  getGenderName
}

const membershipTypes = {
  1: "Xbox",
  2: "PlayStation",
  3: "Steam",
  4: "Blizzard",
  5: "Stadia"
};

const classTypes = {
  0: "Titan",
  1: "Hunter",
  2: "Warlock"
};

const raceTypes = {
  0: "Human",
  1: "Awoken",
  2: "Exo"
};

const genderTypes = {
  0: "Male",
  1: "Female"
};

export function getMembershipTypeName(membershipType) {
  return membershipTypes[membershipType];
}

export function getClassTypeName(classType) {
  return classTypes[classType];
}

export function getRaceName(raceType) {
  return raceTypes[raceType];
}

export function getGenderName(genderType) {
  return genderTypes[genderType];
}
