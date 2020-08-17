export default {
  get,
  set,
  remove
}

export function get(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    console.log(e);
  }
}

export function set(key, value) {
  value = JSON.stringify(value);

  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

export function remove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
}
