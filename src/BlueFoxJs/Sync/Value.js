("use strict");
export const value = async (values = {}, _scope_ = document) => {
  let set = {
    values: {},
    flesh: () => {
      Object.keys(set.values).forEach((key) => {
        set.values[`${key}`].setTextContent(set.values[key].value);
        set.values[`${key}`].setValue(set.values[key].value);
      });
    },
  };

  Object.keys(values).forEach((key) => {
    set.values[`${key}`] = {
      value: values[key],
      origin: values[key],
      setTextContent: (v) => {
        set.values[key].value = v;
        [..._scope_.querySelectorAll(`[setTextContent="${key}"]`)].forEach(
          (e) => {
            e.textContent = v;
          }
        );
      },
      setValue: (v) => {
        set.values[key].value = v;
        [..._scope_.querySelectorAll(`[setValue="${key}"]`)].forEach((e) => {
          e.value = v;
        });
      },
    };

    set.values[`${key}`].setTextContent(values[key]);
    set.values[`${key}`].setValue(values[key]);
  });

  return set;
};
