import { BlueFoxJs } from "./bluefox.js";

("use strict");
window.BlueFoxJs = BlueFoxJs;
window.dispatchEvent(
  new CustomEvent("BlueFoxJs@Ready", {
    detail: { BlueFoxJs: BlueFoxJs },
  })
);
