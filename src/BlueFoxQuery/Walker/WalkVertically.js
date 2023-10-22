("use strict");
export const walkVertically = async (o = { _scope_: null }) => {
  for (let selector of Object.keys(o).filter((key) => {
    return !["_scope_"].includes(key);
  })) {
    let elements = [...o._scope_.querySelectorAll(selector)].filter(
      (element) => {
        return element;
      }
    );
    for (let e of elements) {
      try {
        await o[selector]({
          element: e,
          selector: new String(selector),
          self: o,
        });
      } catch (ex) {
        console.info("walkVertically |", ex);
      }
    }
  }
  return o;
};
