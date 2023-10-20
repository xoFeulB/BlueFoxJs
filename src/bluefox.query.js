// © BlueFoxEnterprise
// https://github.com/xoFeulB

(() => {
  let log = console.log;
  let deepFreeze = (object) => {
    const propNames = Object.getOwnPropertyNames(object);
    for (const name of propNames) {
      const value = object[name];
      if (value && typeof value === "object") {
        deepFreeze(value);
      }
    }
    return Object.freeze(object);
  };
  let getProperty = (_path, _dict, _sep = ".") => {
    let _key = _path.split(_sep)[0];
    let _next_path = _path.split(_sep).slice(1).join(_sep);
    if (_dict[_key] != undefined) {
      let R = getProperty(_next_path, _dict[_key], _sep);
      if (R) {
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

  let BlueFoxQuery = {
    Util: {
      getProperty: getProperty,
    },
    Walker: {
      walkVertically: async (o = { _scope_: null }) => {
        for (let selector of Object.keys(o).filter((key) => {
          return !["_scope_"].includes(key);
        })) {
          let elements = [...o._scope_.querySelectorAll(selector)].filter(
            (element) => {
              return element;
            }
          );
          for (let e of elements) {
            try {
              await o[selector]({
                element: e,
                selector: new String(selector),
                self: o,
              });
            } catch (ex) {
              console.info("walkVertically |", ex);
            }
          }
        }
        return o;
      },
      walkHorizontally: async (o = { _scope_: null }) => {
        let pool = [];
        Object.keys(o)
          .filter((key) => {
            return !["_scope_"].includes(key);
          })
          .forEach((selector) => {
            [...o._scope_.querySelectorAll(selector)]
              .filter((element) => {
                return element;
              })
              .forEach((element) => {
                pool.push({
                  element: element,
                  selector: new String(selector),
                });
              });
          });

        await Promise.all(
          pool.map((_) => {
            return new Promise(async (resolve, reject) => {
              try {
                await o[_.selector]({
                  element: _.element,
                  selector: _.selector,
                  self: o,
                });
                resolve(_.selector);
              } catch (ex) {
                console.info("walkHorizontally |", ex);
              }
            });
          })
        );
        return o;
      },
    },
  };
  window.BlueFoxQuery = deepFreeze(BlueFoxQuery);
  window.dispatchEvent(new Event("BlueFoxQuery@Ready"));
})();
