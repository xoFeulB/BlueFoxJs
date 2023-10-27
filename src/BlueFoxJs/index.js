import { BlueFoxJs } from "./bluefox.js";

("use strict");
window.dispatchEvent(
  new CustomEvent("BlueFoxJs@Ready", {
    detail: { BlueFoxJs: BlueFoxJs },
  })
);
