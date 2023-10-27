("use strict");
export const getProperty = (_path, _dict, _sep = ".") => {
  let _key = _path.split(_sep)[0];
  let _next_path = _path.split(_sep).slice(1).join(_sep);
  if (_dict[_key] != undefined) {
    let R = getProperty(_next_path, _dict[_key], _sep);
    if (R === true) {
      return {
        object: _dict,
        property: _key,
        path: _path,
        separator: _sep,
        value: _dict[_key],
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
