import { getProperty } from "BlueFoxJs/Util/GetProperty.js";

export class v1 {
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
