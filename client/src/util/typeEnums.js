export default {
  getMembershipTypeName
}

const membershipTypes = {
  1: "Xbox",
  2: "PlayStation",
  3: "Steam",
  4: "Blizzard",
  5: "Stadia"
};

// can't use manifest for this as it's needed before we validate/get the manifest
// also there's just no definition for it
export function getMembershipTypeName(membershipType) {
  return membershipTypes[membershipType];
}
