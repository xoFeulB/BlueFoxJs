import { getProperty } from "@xofeulb/bluefox-js/Util/GetProperty.js";
import { walkHorizontally } from "@xofeulb/bluefox-js/Walker/WalkHorizontally.js";
import { walkVertically } from "@xofeulb/bluefox-js/Walker/WalkVertically.js";

("use strict");
export const view = async (_scope_ = document) => {
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
          } catch { }
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
          } catch { }
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

export const enableSyncViewElement = () => {
  window.customElements.define("sync-view", class extends HTMLElement {
    connectedCallback() {
      let syncer = {
        separator: this.attributes.separator ? this.attributes.separator.value : ".",
        from: this.attributes.from.value,
        to: this.attributes.to.value,
        events: this.attributes.events ? JSON.parse(this.attributes.events.value) : ["sync"],
        entryNop: !!this.attributes.entryNop,
        waitActivate: !!this.attributes.waitActivate,
      };

      let init = (syncer) => {
        __init__(syncer);
      };
      let __init__ = (syncer) => {
        let separator = syncer.separator ? syncer.separator : ".";
        let from = syncer.from.split(separator);
        let to = syncer.to.split(separator);

        let from_element = (() => {
          if (from[0] == "this") {
            return this;
          }
          if (from[0] == "window") {
            return window;
          }
          return document.querySelector(from[0]);
        })();
        let to_element = (() => {
          if (to[0] == "this") {
            return this;
          }
          if (to[0] == "window") {
            return window;
          }
          return document.querySelector(to[0]);
        })();

        let SyncView = {
          separator: separator,
          from: from_element,
          fromProperty: from.slice(1).join(separator),
          to: to_element,
          toProperty: to.slice(1).join(separator),
          events: syncer.events,
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
          } catch { }
        };

        SyncView.events.forEach((eventType) => {
          SyncView.from.addEventListener(eventType, (event) => {
            SyncView.sync();
            SyncView.to.dispatchEvent(new Event("sync"));
          });
        });
        SyncView.entryNop ? null : SyncView.sync();
        this.SyncView = SyncView;
      };

      if (syncer.waitActivate) {
        this.activate = () => {
          init(syncer);
        };
      } else {
        init(syncer);
      }
    }
  });
}