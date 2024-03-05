import { getProperty } from "@xofeulb/bluefox-js/Util/GetProperty.js";

export class v0 {
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
