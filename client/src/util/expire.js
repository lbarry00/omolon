export default {
  calculateExpireTimestamp,
  validateExpiration
};

export function calculateExpireTimestamp(expires_in) {
  const now = Date.now();
  return now + (expires_in * 1000);
}

export function validateExpiration(expires_at) {
  const now = Date.now();
  if (expires_at >= now) {
    return false;
  } else {
    return true;
  }
}
