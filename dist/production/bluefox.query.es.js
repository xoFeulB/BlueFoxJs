/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  z: () => (/* binding */ BlueFoxQuery)
});

;// CONCATENATED MODULE: ./src/BlueFoxQuery/Util/GetProperty.js

const getProperty = (_path, _dict, _sep = ".") => {
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

;// CONCATENATED MODULE: ./src/BlueFoxQuery/Util/DeepFreeze.js

const deepFreeze = (object) => {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
};

;// CONCATENATED MODULE: ./src/BlueFoxQuery/Walker/WalkHorizontally.js

const walkHorizontally = async (o = { _scope_: null }) => {
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
  }
;// CONCATENATED MODULE: ./src/BlueFoxQuery/Walker/WalkVertically.js

const walkVertically = async (o = { _scope_: null }) => {
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
};

;// CONCATENATED MODULE: ./src/BlueFoxQuery/Sync/View.js




("use strict");
const view = async (_scope_ = document) => {
  await walkHorizontally({
    _scope_: _scope_,
    "[capture]": async (_) => {
      let target = document.querySelector(
        _.element.attributes["capture"].value
      );
      let targetTagName = target.tagName.toLowerCase();

      _.element.setAttribute("sync", "");
      _.element.setAttribute("sync-to-this", "");

      if (targetTagName == "input") {
        _.element.setAttribute("sync-to-property", "textContent");
        _.element.setAttribute(
          "sync-from",
          _.element.attributes["capture"].value
        );
        _.element.setAttribute("sync-from-property", "value");
        _.element.setAttribute(
          "sync-event",
          JSON.stringify(["sync", "change", "input"])
        );
      } else if (targetTagName == "select") {
        _.element.setAttribute("sync-to-property", "textContent");
        _.element.setAttribute(
          "sync-from",
          _.element.attributes["capture"].value
        );
        _.element.setAttribute(
          "sync-from-property",
          "selectedOptions.0.textContent"
        );
        _.element.setAttribute(
          "sync-event",
          JSON.stringify(["sync", "change"])
        );
      }

      _.element.removeAttribute("capture");
    },
  });

  await walkVertically({
    _scope_: _scope_,
    "sync,[sync]": async (_) => {
      let init = () => {
        __init__();
      };
      let __init__ = () => {
        _.element.SyncView = {
          from: _.element.attributes["sync-from-this"]
            ? e
            : document.querySelector(_.element.attributes["sync-from"].value),
          fromProperty: _.element.attributes["sync-from-property"].value,
          to: _.element.attributes["sync-to-this"]
            ? _.element
            : document.querySelector(_.element.attributes["sync-to"].value),
          toProperty: _.element.attributes["sync-to-property"].value,
          event: JSON.parse(
            _.element.attributes["sync-event"]
              ? _.element.attributes["sync-event"].value
              : '["sync"]'
          ),
          entryNop: _.element.attributes["sync-entry-nop"],
          init: init,
        };

        _.element.SyncView.sync = () => {
          let fromObj = getProperty(
            _.element.SyncView.fromProperty,
            _.element.SyncView.from
          );
          let toObj = getProperty(
            _.element.SyncView.toProperty,
            _.element.SyncView.to
          );
          try {
            toObj.object[toObj.property] = fromObj.object[fromObj.property];
          } catch {}
        };
        _.element.SyncView.entryNop ? null : _.element.SyncView.sync();

        _.element.SyncView.event.forEach((eventType) => {
          _.element.SyncView.from.addEventListener(eventType, (event) => {
            _.element.SyncView.sync();
            _.element.SyncView.to.dispatchEvent(new Event("sync"));
          });
        });
      };
      init();
    },
  });
};

;// CONCATENATED MODULE: ./src/BlueFoxQuery/bluefox.query.js






("use strict");
const BlueFoxQuery = (() => {
  let BlueFoxQuery = {
    Util: {
      getProperty: getProperty,
    },
    Walker: {
      walkHorizontally: walkHorizontally,
      walkVertically: walkVertically,
    },
    Sync: {
      view: view,
    },
  };
  return deepFreeze(BlueFoxQuery);
})();

var __webpack_exports__BlueFoxQuery = __webpack_exports__.z;
export { __webpack_exports__BlueFoxQuery as BlueFoxQuery };
