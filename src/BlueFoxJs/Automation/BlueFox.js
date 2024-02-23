import { v0 } from "BlueFoxJs/Automation/v0.js";
import { v1 } from "BlueFoxJs/Automation/v1.js";

export class BlueFox {
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

export class BlueFoxScript {
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