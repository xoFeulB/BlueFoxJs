import { BlueFox } from "BlueFoxJs/Automation/BlueFox.js";
import { getProperty } from "BlueFoxJs/Util/GetProperty.js";
import { deepFreeze } from "BlueFoxJs/Util/DeepFreeze.js";
import { getAllPath } from "BlueFoxJs/Util/JSON.js";
import { walkHorizontally } from "BlueFoxJs/Walker/WalkHorizontally.js";
import { walkVertically } from "BlueFoxJs/Walker/WalkVertically.js";
import { view } from "BlueFoxJs/Sync/View.js";
import { value } from "BlueFoxJs/Sync/Value.js";
import { customFaker } from "BlueFoxJs/Util/Faker.js";

("use strict");
export const BlueFoxJs = (() => {
  let BlueFoxJs = {
    Automation: {
      BlueFox: BlueFox,
    },
    Util: {
      getProperty: getProperty,
      getAllPath: getAllPath,
      Faker: customFaker,
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
  getProperty,
  getAllPath,
  customFaker,
  walkHorizontally,
  walkVertically,
  view,
  value,
};