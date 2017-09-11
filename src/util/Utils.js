
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function createCategoriesOption(categories) {
  return categories.map(
    (cat) => {return { key : cat.name, value : cat.name, text : cat.name }}
  )
}