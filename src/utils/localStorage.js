export const saveToLocalStorage = (name, array) => {
  localStorage.setItem(name, JSON.stringify(array));
}

export const getFromLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name)) || [];
}