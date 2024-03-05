import { BlueFox, BlueFoxScript } from "@xofeulb/bluefox-js/Automation/BlueFox.js";
import { getProperty } from "@xofeulb/bluefox-js/Util/GetProperty.js";
import { getAllPath } from "@xofeulb/bluefox-js/Util/JSON.js";
import { walkHorizontally } from "@xofeulb/bluefox-js/Walker/WalkHorizontally.js";
import { walkVertically } from "@xofeulb/bluefox-js/Walker/WalkVertically.js";
import { view } from "@xofeulb/bluefox-js/Sync/View.js";
import { value } from "@xofeulb/bluefox-js/Sync/Value.js";

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
