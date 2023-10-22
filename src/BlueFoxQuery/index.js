import { BlueFoxQuery } from "./bluefox.query.js";

("use strict");
window.dispatchEvent(
  new CustomEvent("BlueFoxQuery@Ready", {
    detail: { BlueFoxQuery: BlueFoxQuery },
  })
);
