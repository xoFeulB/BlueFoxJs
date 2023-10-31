("use strict");
export const getProperty = (_path, _obj, _sep = ".") => {
  let _key = _path.split(_sep)[0];
  let _next_path = _path.split(_sep).slice(1).join(_sep);
  if (_obj[_key] != undefined) {
    let R = getProperty(_next_path, _obj[_key], _sep);
    if (R === true) {
      return {
        object: _obj,
        property: _key,
        path: _path,
        separator: _sep,
        value: _obj[_key],
      };
    } else {
      return R;
    }
  } else {
    if (_path == _next_path) {
      return true;
    } else {
      return false;
    }
  }
};
