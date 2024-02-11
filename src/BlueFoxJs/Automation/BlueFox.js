import { v0 } from "BlueFoxJs/Automation/v0.js";
import { v1 } from "BlueFoxJs/Automation/v1.js";
import l8 from "@l8js/l8";

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
  constructor() {
    this.bluefox = new BlueFox();
    this.selector = "";
    this.tail = {};
    this.init(config);
    l8.liquify(this);
  }
  init(object) {
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
        }
      ],
      actions: []
    }, object);
    this.stack = [];
    return this;
  }
  target(selector) {
    this.selector = selector;
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
  async run(object) {
    await this.bluefox(Object.assign(this.tail, object));
    return this;
  }
}