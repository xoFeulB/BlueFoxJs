import { BlueFox, BlueFoxScript } from "BlueFoxJs/Automation/BlueFox.js";
import { getProperty } from "BlueFoxJs/Util/GetProperty.js";
import { getAllPath } from "BlueFoxJs/Util/JSON.js";
import { walkHorizontally } from "BlueFoxJs/Walker/WalkHorizontally.js";
import { walkVertically } from "BlueFoxJs/Walker/WalkVertically.js";
import { view } from "BlueFoxJs/Sync/View.js";
import { value } from "BlueFoxJs/Sync/Value.js";

("use strict");
export const BlueFoxJs = (() => {
  let BlueFoxJs = {
    Automation: {
      BlueFox: BlueFox,
      BlueFoxScript: BlueFoxScript,
    },
    Util: {
      getProperty: getProperty,
      getAllPath: getAllPath,
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
  BlueFoxScript,
  getProperty,
  getAllPath,
  walkHorizontally,
  walkVertically,
  view,
  value,
};