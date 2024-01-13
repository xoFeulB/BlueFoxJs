import { BlueFox } from "BlueFoxJs/Automation/BlueFox.js";
import { walkHorizontally } from "BlueFoxJs/Walker/WalkHorizontally.js";
import { walkVertically } from "BlueFoxJs/Walker/WalkVertically.js";
import { view } from "BlueFoxJs/Sync/View.js";
import { value } from "BlueFoxJs/Sync/Value.js";

("use strict");
export const BlueFoxJs = (() => {
  let BlueFoxJs = {
    Automation: {
      BlueFox: BlueFox,
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

export {
  BlueFox,
  walkHorizontally,
  walkVertically,
  view,
  value,
};