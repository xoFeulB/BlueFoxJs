import { getProperty } from "BlueFoxQuery/Util/GetProperty.js";
import { deepFreeze } from "BlueFoxQuery/Util/DeepFreeze.js";
import { walkHorizontally } from "BlueFoxQuery/Walker/WalkHorizontally.js";
import { walkVertically } from "BlueFoxQuery/Walker/WalkVertically.js";
import { view } from "BlueFoxQuery/Sync/View.js";

("use strict");
export const BlueFoxQuery = (() => {
  let BlueFoxQuery = {
    Util: {
      getProperty: getProperty,
    },
    Walker: {
      walkHorizontally: walkHorizontally,
      walkVertically: walkVertically,
    },
    Sync: {
      view: view,
    },
  };
  return deepFreeze(BlueFoxQuery);
})();
