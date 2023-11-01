("use strict");
export const getAllPath = (_obj) => {
  if (typeof _obj !== "object") {
    return [];
  }

  let paths = [];
  for (let key in _obj) {
    let val = _obj[key];
    if (typeof val === "object") {
      let subPaths = getAllPath(val);
      subPaths.forEach((e) => {
        paths.push({
          path: [key, e.path].flat(),
          value: e.value,
          type: typeof e.value,
        });
      });
    } else {
      let path = { path: key, value: val, type: typeof val };
      paths.push(path);
    }
  }
  return paths;
};
