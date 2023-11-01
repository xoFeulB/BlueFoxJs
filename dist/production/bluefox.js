/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/BlueFoxJs/Util/GetProperty.js

const getProperty = (_path, _obj, _sep = ".") => {
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

;// CONCATENATED MODULE: ./src/BlueFoxJs/Util/DeepFreeze.js

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

;// CONCATENATED MODULE: ./src/BlueFoxJs/Util/JSON.js

const getAllPath = (_obj, _sep = ".") => {
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
          path: [key, e.path].join(_sep),
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

;// CONCATENATED MODULE: ./src/BlueFoxJs/Walker/WalkHorizontally.js

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
;// CONCATENATED MODULE: ./src/BlueFoxJs/Walker/WalkVertically.js

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

;// CONCATENATED MODULE: ./src/BlueFoxJs/Sync/View.js




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
    "[sync]": async (_) => {
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
          events: JSON.parse(
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

        _.element.SyncView.events.forEach((eventType) => {
          _.element.SyncView.from.addEventListener(eventType, (event) => {
            _.element.SyncView.sync();
            _.element.SyncView.to.dispatchEvent(new Event("sync"));
          });
        });
      };
      init();
    },
    sync: async (_) => {
      _.element.SyncView = {
        Syncs: [],
      };
      let syncers = JSON.parse(_.element.textContent);
      let init = (syncer) => {
        __init__(syncer);
      };
      let __init__ = (syncer) => {
        let separator = syncer.separator ? syncer.separator : ".";
        let from = syncer.from.split(separator);
        let to = syncer.to.split(separator);

        let event = syncer.events;

        let from_element = _.self._scope_.querySelector(from[0]);
        let to_element = _.self._scope_.querySelector(to[0]);

        let SyncView = {
          separator: separator,
          from: from_element,
          fromProperty: from.slice(1).join(separator),
          to: to_element,
          toProperty: to.slice(1).join(separator),
          events: event,
          entryNop: syncer.entryNop,
          init: init,
        };

        SyncView.sync = () => {
          let fromObj = getProperty(
            SyncView.fromProperty,
            SyncView.from,
            SyncView.separator
          );
          let toObj = getProperty(
            SyncView.toProperty,
            SyncView.to,
            SyncView.separator
          );
          try {
            toObj.object[toObj.property] = fromObj.object[fromObj.property];
          } catch {}
        };

        SyncView.events.forEach((eventType) => {
          SyncView.from.addEventListener(eventType, (event) => {
            SyncView.sync();
            SyncView.to.dispatchEvent(new Event("sync"));
          });
        });
        SyncView.entryNop ? null : SyncView.sync();
        _.element.SyncView.Syncs.push(SyncView);
      };

      if (Array.prototype == syncers.__proto__) {
        syncers.forEach((syncer) => {
          init(syncer);
        });
      }
      if (Object.prototype == syncers.__proto__) {
        init(syncers);
      }
    },
  });
};

;// CONCATENATED MODULE: ./src/BlueFoxJs/Sync/Value.js

const value = async (values = {}, _scope_ = document) => {
  let set = {
    values: {},
    flesh: () => {
      Object.keys(set.values).forEach((key) => {
        set.values[`${key}`].setTextContent(set.values[key].value);
        set.values[`${key}`].setValue(set.values[key].value);
      });
    },
  };

  Object.keys(values).forEach((key) => {
    set.values[`${key}`] = {
      value: values[key],
      origin: values[key],
      setTextContent: (v) => {
        set.values[key].value = v;
        [..._scope_.querySelectorAll(`[setTextContent="${key}"]`)].forEach(
          (e) => {
            e.textContent = v;
          }
        );
      },
      setValue: (v) => {
        set.values[key].value = v;
        [..._scope_.querySelectorAll(`[setValue="${key}"]`)].forEach((e) => {
          e.value = v;
        });
      },
    };

    set.values[`${key}`].setTextContent(values[key]);
    set.values[`${key}`].setValue(values[key]);
  });

  return set;
};

;// CONCATENATED MODULE: ./src/BlueFoxJs/bluefox.js








("use strict");
const BlueFoxJs = (() => {
  let BlueFoxJs = {
    Util: {
      getProperty: getProperty,
      getAllPath: getAllPath,
    },
    Walker: {
      walkHorizontally: walkHorizontally,
      walkVertically: walkVertically,
    },
    Sync: {
      view: view,
      value: value,
    },
  };
  return deepFreeze(BlueFoxJs);
})();

;// CONCATENATED MODULE: ./src/BlueFoxJs/index.js


("use strict");
window.dispatchEvent(
  new CustomEvent("BlueFoxJs@Ready", {
    detail: { BlueFoxJs: BlueFoxJs },
  })
);

/******/ })()
;