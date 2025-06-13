import { deepFreeze } from "@xofeulb/bluefox-js/Util/DeepFreeze.js";
import { getProperty } from "@xofeulb/bluefox-js/Util/GetProperty.js";
import { getAllPath } from "@xofeulb/bluefox-js/Util/JSON.js";
import { walkHorizontally } from "@xofeulb/bluefox-js/Walker/WalkHorizontally.js";
import { walkVertically } from "@xofeulb/bluefox-js/Walker/WalkVertically.js";

("use strict");
export const BlueFoxJs = (() => {
  let BlueFoxJs = {
    Util: {
      deepFreeze: deepFreeze,
      getProperty: getProperty,
      getAllPath: getAllPath,
    },
    Walker: {
      walkHorizontally: walkHorizontally,
      walkVertically: walkVertically,
    }
  };
  return BlueFoxJs;
})();
