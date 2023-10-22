import { getProperty } from "BlueFoxQuery/Util/GetProperty.js";
import { walkHorizontally } from "BlueFoxQuery/Walker/WalkHorizontally.js";
import { walkVertically } from "BlueFoxQuery/Walker/WalkVertically.js";

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
