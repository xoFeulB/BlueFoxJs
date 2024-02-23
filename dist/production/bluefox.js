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

;// CONCATENATED MODULE: ./src/BlueFoxJs/Automation/v0.js


class v0 {
  constructor() {
    this.J = null;
    this.take = [];
    this.actions = null;
    this.dispatchEvents = null;
    this.msec = null;

    this.sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

    this.actionHandler = {
      set: async (action) => {
        let e = document.querySelector(action.target);
        if (e) {
          if (action.property) {
            for (let propertyPath in action.property) {
              let found = getProperty(propertyPath, e);
              if (found.object) {
                found.object[found.property] = action.property[propertyPath];
                for (let eventType of this.dispatchEvents) {
                  e.dispatchEvent(new Event(eventType, { bubbles: true }));
                }
              }
            }
          }
          if (action.attribute) {
            for (let attributeName in action.attribute) {
              e.setAttribute(attributeName, action.attribute[attributeName]);
              for (let eventType of this.dispatchEvents) {
                e.dispatchEvent(new Event(eventType, { bubbles: true }));
              }
            }
          }
        }
      },
      take: async (action) => {
        let e = document.querySelector(action.target);
        if (e) {
          let take = action;
          if (action.property) {
            let take_property = {};
            for (let propertyPath in action.property) {
              let found = getProperty(propertyPath, e);
              if (found.object) {
                take_property[propertyPath] = found.object[found.property];
              }
            }
            Object.assign(take, {
              property: take_property,
            });
          }
          if (action.attribute) {
            let take_attribute = {};
            for (let attributeName in action.attribute) {
              take_attribute[attributeName] = e.getAttribute(attributeName);
            }
            Object.assign(take, {
              attribute: take_attribute,
            });
          }
          this.take.push(take);
        }
      },
      eval: async (action) => {
        let e = document.querySelector(action.target);
        if (e) {
          if (action.property) {
            for (let propertyPath in action.property) {
              let found = getProperty(propertyPath, e);
              if (found.object) {
                found.object[found.property](action.property[propertyPath]);
              }
            }
          }
        }
      },
      capture: async (action) => {
        let e = document.querySelector(action.target);
        if (e) {
          try {
            await this.captureDOM(
              action.fileName,
              e,
              window,
              action.format,
              action.quality
            );
          } catch {}
        }
      },
      sleep: async (action) => {
        await this.sleep(action.target);
      },
      event: async (action) => {
        let e = document.querySelector(action.target);
        if (e) {
          e.dispatchEvent(new Event(action.dispatchEvent, { bubbles: true }));
        }
      },
      save: async (action) => {
        let R = this.J;
        Object.assign(R, {
          takes: this.take,
        });
        Object.assign(document.createElement("a"), {
          href: window.URL.createObjectURL(
            new Blob([JSON.stringify(R)], { type: "application/json" })
          ),
          download: `${action.fileName}.json`,
        }).click();
        this.take = [];
      },
    };
  }
  async do(J) {
    this.J = J;
    this.take = [];
    this.actions = J.actions;
    this.dispatchEvents = J.dispatchEvents;
    this.msec = J.sleep;

    for (let action of this.actions) {
      await this.actionHandler[action.type](action);
      this.msec != 0 ? await this.sleep(this.msec) : null;
    }
    return Object.assign(J, {
      stack: this.take,
    });
  }
}

;// CONCATENATED MODULE: ./src/BlueFoxJs/Automation/v1.js


class v1 {
  constructor() {
    this.J = null;
    this.stack = [];
    this.actions = null;
    this.dispatchEvents = null;
    this.msec = null;
    this.focus = document;

    this.sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

    this.actionHandler = {
      set: async (action) => {
        let e = this.focus.querySelector(action.target.selector);
        if (e) {
          if (action?.target?.property) {
            let _ = getProperty(action.target.property, e);
            if (_.object) {
              e = _.object[_.property];
            }
          }

          if (action?.option?.property) {
            for (let propertyPath in action.option.property) {
              let found = getProperty(propertyPath, e);
              if (found.object) {
                found.object[found.property] =
                  action.option.property[propertyPath];

                for (let dispatchEvent of this.dispatchEvents) {
                  let _ = getProperty(dispatchEvent.option.eventObject, window);
                  let event = _.object[_.property];
                  e.dispatchEvent(
                    new event(
                      dispatchEvent.option.eventType,
                      dispatchEvent.option.eventArgs
                    )
                  );
                }
              }
            }
          }
          if (action?.option?.attribute) {
            for (let attributeName in action.option.attribute) {
              e.setAttribute(
                attributeName,
                action.option.attribute[attributeName]
              );

              for (let dispatchEvent of this.dispatchEvents) {
                let _ = getProperty(dispatchEvent.option.eventObject, window);
                let event = _.object[_.property];
                e.dispatchEvent(
                  new event(
                    dispatchEvent.option.eventType,
                    dispatchEvent.option.eventArgs
                  )
                );
              }
            }
          }
        }
      },
      push: async (action) => {
        let e = this.focus.querySelector(action.target.selector);
        if (e) {
          if (action?.target?.property) {
            let _ = getProperty(action.target.property, e);
            if (_.object) {
              e = _.object[_.property];
            }
          }

          let stack = action;
          if (action?.option?.property) {
            let stack_property = {};
            for (let propertyPath in action.option.property) {
              let found = getProperty(propertyPath, e);
              if (found.object) {
                stack_property[propertyPath] = found.object[found.property];
              }
            }
            Object.assign(stack.option, {
              property: stack_property,
            });
          }
          if (action?.option?.attribute) {
            let stack_attribute = {};
            for (let attributeName in action.option.attribute) {
              stack_attribute[attributeName] = e.getAttribute(attributeName);
            }
            Object.assign(stack.option, {
              attribute: stack_attribute,
            });
          }
          this.stack.push(stack);
        }
      },
      call: async (action) => {
        let e = this.focus.querySelector(action.target.selector);
        if (e) {
          let _ = getProperty(action.target.property, e);
          if (_.object) {
            if (action?.option) {
              _.object[_.property](action?.option);
            } else {
              _.object[_.property]();
            }
          }
        }
      },
      event: async (action) => {
        let e = this.focus.querySelector(action.target.selector);
        if (e) {
          if (action?.target?.property) {
            let _ = getProperty(action.target.property, e);
            if (_.object) {
              let eventObject = getProperty(action.option.eventObject, window);
              let event = eventObject.object[eventObject.property];
              _.object[_.property].dispatchEvent(
                new event(
                  action.option.eventType,
                  Object.assign(
                    {
                      target: _.object[_.property],
                      view: window,
                    },
                    action.option.eventArgs
                  )
                )
              );
            }
          } else {
            let eventObject = getProperty(action.option.eventObject, window);
            let event = eventObject.object[eventObject.property];
            e.dispatchEvent(
              new event(
                action.option.eventType,
                Object.assign(
                  {
                    target: e,
                    view: window,
                  },
                  action.option.eventArgs
                )
              )
            );
          }
        }
      },
      key: async (action) => {
        try {
          await this.dispatchKeyEvent(action.option);
        } catch (err) { }
      },
      file: async (action) => {
        let e = this.focus.querySelector(action.target.selector);
        try {
          let dataTransfer = new DataTransfer();
          action.files.forEach(file => {
            let data = new File([new window[file.object](file.blob)], file.name, { type: file.type });
            dataTransfer.items.add(data);
          });
          e.files = dataTransfer.files;
        } catch (err) { }
      },
      sleep: async (action) => {
        await this.sleep(action.option.msec);
      },
      open: async (action) => {
        window.location.href = action.option.url;
      },
      focus: async (action) => {
        let e = this.focus.querySelector(action.target.selector);
        if (e) {
          if (action?.target?.property) {
            let _ = getProperty(action.target.property, e);
            if (_.object) {
              this.focus = _.object[_.property];
            }
          } else {
            this.focus = e;
          }
        }
        if (action?.target?.reset) {
          this.focus = document;
        }
      },
      capture: async (action) => {
        let e = this.focus.querySelector(action.target.selector);
        if (e) {
          if (action?.target?.property) {
            let _ = getProperty(action.target.property, e);
            if (_.object) {
              e = _.object[_.property];
            }
          }

          try {
            await this.captureDOM(
              action.option.fileName,
              e,
              window,
              action.option.format,
              action.option.quality
            );
          } catch (err) { }
        }
      },
      save: async (action) => {
        let R = this.J;
        Object.assign(R, {
          stack: this.stack,
        });
        Object.assign(this.focus.createElement("a"), {
          href: window.URL.createObjectURL(
            new Blob([JSON.stringify(R, null, 4)], {
              type: "application/json",
            })
          ),
          download: `${action.option.fileName}.json`,
        }).click();
        this.stack = [];
      },
    };
  }
  async do(J) {
    this.J = J;
    this.stack = [];
    this.actions = J.actions;
    this.dispatchEvents = J.dispatchEvents;
    this.msec = J.sleep;

    for (let action of this.actions) {
      await this.actionHandler[action.type](action);
      this.msec != 0 ? await this.sleep(this.msec) : null;
    }
    return Object.assign(J, {
      stack: this.stack,
    });
  }
}

;// CONCATENATED MODULE: ./src/BlueFoxJs/Automation/BlueFox.js



class BlueFox {
  async do(J) {
    return await {
      0: async () => {
        let _ = new v0();
        _.captureDOM = this.captureDOM;
        return await _.do(J);
      },
      1: async () => {
        let _ = new v1();
        _.captureDOM = this.captureDOM;
        _.dispatchKeyEvent = this.dispatchKeyEvent;
        return await _.do(J);
      },
    }[J.meta.version]();
  }
}

class BlueFoxScript {
  constructor(config) {
    this.selector = "";
    this.tail = {};
    this.init(config);
    return this;
  }
  init(config) {
    this.tail = Object.assign({
      meta: {
        version: 1,
      },
      sleep: 0,
      dispatchEvents: [
        {
          option: {
            eventObject: "Event",
            eventType: "change",
            eventArgs: {
              bubbles: true
            }
          }
        },
        {
          option: {
            eventObject: "Event",
            eventType: "input",
            eventArgs: {
              bubbles: true
            }
          }
        }
      ],
      actions: []
    }, config);
    this.stack = [];
    return this;
  }
  target(selector) {
    this.selector = selector;
    return this;
  }
  defined(selector) {
    this.selector = `:is([data-testid="${selector}"],[bluefox-label="${selector}"],[aria-description="${selector}"],[aria-label="${selector}"])`;
    return this;
  }
  set(object) {
    this.tail.actions.push(
      {
        type: "set",
        target: {
          selector: this.selector,
          property: null,
          all: false
        },
        option: object
      }
    );
    return this;
  }
  setProperty(object) {
    this.tail.actions.push(
      {
        type: "set",
        target: {
          selector: this.selector,
          property: null,
          all: false
        },
        option: {
          property: object,
        }
      }
    );
    return this;
  }
  setAttribute(object) {
    this.tail.actions.push(
      {
        type: "set",
        target: {
          selector: this.selector,
          property: null,
          all: false
        },
        option: {
          attribute: object,
        }
      }
    );
    return this;
  }
  push(object) {
    this.tail.actions.push(
      {
        type: "push",
        target: {
          selector: this.selector,
          property: null,
          all: false
        },
        option: object
      }
    );
    return this;
  }
  call(property, object) {
    this.tail.actions.push(
      {
        type: "call",
        target: {
          selector: this.selector,
          property: property,
        },
        option: object
      }
    );
    return this;
  }
  event(object) {
    this.tail.actions.push(
      {
        type: "event",
        target: {
          selector: this.selector,
          property: null,
        },
        option: object
      }
    );
    return this;
  }
  focus(property, reset = false) {
    this.tail.actions.push(
      {
        type: "focus",
        target: {
          selector: this.selector,
          property: property,
          reset: reset,
        },
      }
    );
    return this;
  }
  capture(
    selector = this.selector,
    object = {
      fileName: "capture",
      format: "png",
      quality: 100
    }
  ) {
    this.tail.actions.push(
      {
        type: "capture",
        target: {
          selector: selector,
          property: null,
        },
        option: object
      }
    );
    return this;
  }
  key(object) {
    this.tail.actions.push(
      {
        type: "key",
        option: object
      }
    );
    return this;
  }
  open(url) {
    this.tail.actions.push(
      {
        type: "open",
        option: { url: url }
      }
    );
    return this;
  }
  sleep(msec) {
    this.tail.actions.push(
      {
        type: "sleep",
        option: {
          msec: msec
        }
      }
    );
    return this;
  }
  file(object) {
    this.tail.actions.push(
      {
        type: "file",
        target: {
          selector: this.selector,
        },
        files: object
      }
    );
    return this;
  }
}
;// CONCATENATED MODULE: ./src/BlueFoxJs/Util/JSON.js

const getAllPath = (_obj) => {
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
            ? _.element
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
        set.values[`${key}`].set(set.values[key].value);
      });
    },
  };

  Object.keys(values).forEach((key) => {
    set.values[`${key}`] = {
      value: values[key],
      origin: values[key],
      set: (v) => {
        set.values[key].value = v;
        [..._scope_.querySelectorAll(`[setTextContent="${key}"]`)].forEach(
          (e) => {
            e.textContent = v;
          }
        );
        set.values[key].value = v;
        [..._scope_.querySelectorAll(`[setValue="${key}"]`)].forEach((e) => {
          e.value = v;
        });
      },
    };

    set.values[`${key}`].set(values[key]);
  });

  return set;
};

;// CONCATENATED MODULE: ./src/BlueFoxJs/bluefox.js








("use strict");
const BlueFoxJs = (() => {
  let BlueFoxJs = {
    Automation: {
      BlueFox: BlueFox,
      BlueFoxScript: BlueFoxScript,
    },
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
  return BlueFoxJs;
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