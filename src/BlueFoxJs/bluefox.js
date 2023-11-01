import { getProperty } from "BlueFoxJs/Util/GetProperty.js";
import { deepFreeze } from "BlueFoxJs/Util/DeepFreeze.js";
import { getAllPath } from "BlueFoxJs/Util/JSON.js";
import { walkHorizontally } from "BlueFoxJs/Walker/WalkHorizontally.js";
import { walkVertically } from "BlueFoxJs/Walker/WalkVertically.js";
import { view } from "BlueFoxJs/Sync/View.js";
import { value } from "BlueFoxJs/Sync/Value.js";

("use strict");
export const BlueFoxJs = (() => {
  let BlueFoxJs = {
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
  return deepFreeze(BlueFoxJs);
})();
