/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  T: () => (/* binding */ BlueFoxJs)
});

;// ./src/BlueFoxJs/Util/DeepFreeze.js

const deepFreeze = (object) => {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
};

;// ./src/BlueFoxJs/Util/GetProperty.js

const getProperty = (_path, _obj, _sep = ".") => {
  let _key = _path.split(_sep)[0];
  let _next_path = _path.split(_sep).slice(1).join(_sep);
  if (_obj[_key] != undefined) {
    let R = getProperty(_next_path, _obj[_key], _sep);
    if (R === true) {
      return {
        object: _obj,
        property: _key,
        path: _path,
        separator: _sep,
        value: _obj[_key],
      };
    } else {
      return R;
    }
  } else {
    if (_path == _next_path) {
      return true;
    } else {
      return false;
    }
  }
};

;// ./src/BlueFoxJs/Util/JSON.js

const getAllPath = (_obj) => {
  if (typeof _obj !== "object") {
    return [];
  }

  let paths = [];
  for (let key in _obj) {
    let val = _obj[key];
    if (typeof val === "object") {
      let subPaths = getAllPath(val);
      subPaths.forEach((e) => {
        paths.push({
          path: [key, e.path].flat(),
          value: e.value,
          type: typeof e.value,
        });
      });
    } else {
      let path = { path: key, value: val, type: typeof val };
      paths.push(path);
    }
  }
  return paths;
};

;// ./src/BlueFoxJs/Walker/WalkHorizontally.js

const walkHorizontally = async (o = { _scope_: null }) => {
    let pool = [];
    Object.keys(o)
      .filter((key) => {
        return !["_scope_"].includes(key);
      })
      .forEach((selector) => {
        [...o._scope_.querySelectorAll(selector)]
          .filter((element) => {
            return element;
          })
          .forEach((element) => {
            pool.push({
              element: element,
              selector: new String(selector),
            });
          });
      });

    await Promise.all(
      pool.map((_) => {
        return new Promise(async (resolve, reject) => {
          try {
            await o[_.selector]({
              element: _.element,
              selector: _.selector,
              self: o,
            });
            resolve(_.selector);
          } catch (ex) {
            console.info("walkHorizontally |", ex);
          }
        });
      })
    );
    return o;
  }
;// ./src/BlueFoxJs/Walker/WalkVertically.js

const walkVertically = async (o = { _scope_: null }) => {
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

;// ./node_modules/css-selector-generator/esm/utilities-iselement.js
/**
 * Guard function that checks if provided `input` is an Element.
 */
function isElement(input) {
    return (typeof input === "object" &&
        input !== null &&
        input.nodeType === Node.ELEMENT_NODE);
}
//# sourceMappingURL=utilities-iselement.js.map
;// ./node_modules/css-selector-generator/esm/types.js
const OPERATOR = {
    NONE: "",
    DESCENDANT: " ",
    CHILD: " > ",
};
const CSS_SELECTOR_TYPE = {
    id: "id",
    class: "class",
    tag: "tag",
    attribute: "attribute",
    nthchild: "nthchild",
    nthoftype: "nthoftype",
};
//# sourceMappingURL=types.js.map
;// ./node_modules/css-selector-generator/esm/utilities-typescript.js
/**
 * Checks whether value is one of the enum's values.
 */
function isEnumValue(haystack, needle) {
    return Object.values(haystack).includes(needle);
}
//# sourceMappingURL=utilities-typescript.js.map
;// ./node_modules/css-selector-generator/esm/utilities-messages.js
const libraryName = "CssSelectorGenerator";
/**
 * Convenient wrapper for `console.warn` using consistent formatting.
 */
function showWarning(id = "unknown problem", ...args) {
    // eslint-disable-next-line no-console
    console.warn(`${libraryName}: ${id}`, ...args);
}
//# sourceMappingURL=utilities-messages.js.map
;// ./node_modules/css-selector-generator/esm/utilities-options.js




const DEFAULT_OPTIONS = {
    selectors: [
        CSS_SELECTOR_TYPE.id,
        CSS_SELECTOR_TYPE.class,
        CSS_SELECTOR_TYPE.tag,
        CSS_SELECTOR_TYPE.attribute,
    ],
    // if set to true, always include tag name
    includeTag: false,
    whitelist: [],
    blacklist: [],
    combineWithinSelector: true,
    combineBetweenSelectors: true,
    root: null,
    maxCombinations: Number.POSITIVE_INFINITY,
    maxCandidates: Number.POSITIVE_INFINITY,
};
/**
 * Makes sure returned value is a list containing only valid selector types.
 * @param input
 */
function sanitizeSelectorTypes(input) {
    if (!Array.isArray(input)) {
        return [];
    }
    return input.filter((item) => isEnumValue(CSS_SELECTOR_TYPE, item));
}
/**
 * Checks whether provided value is of type RegExp.
 */
function isRegExp(input) {
    return input instanceof RegExp;
}
/**
 * Checks whether provided value is usable in whitelist or blacklist.
 * @param input
 */
function isCssSelectorMatch(input) {
    return ["string", "function"].includes(typeof input) || isRegExp(input);
}
/**
 * Converts input to a list of valid values for whitelist or blacklist.
 */
function sanitizeCssSelectorMatchList(input) {
    if (!Array.isArray(input)) {
        return [];
    }
    return input.filter(isCssSelectorMatch);
}
/**
 * Checks whether provided value is valid Node.
 */
function isNode(input) {
    return input instanceof Node;
}
/**
 * Checks whether provided value is valid ParentNode.
 */
function isParentNode(input) {
    const validParentNodeTypes = [
        Node.DOCUMENT_NODE,
        Node.DOCUMENT_FRAGMENT_NODE, // this includes Shadow DOM root
        Node.ELEMENT_NODE,
    ];
    return isNode(input) && validParentNodeTypes.includes(input.nodeType);
}
/**
 * Makes sure that the root node in options is valid.
 */
function utilities_options_sanitizeRoot(input, element) {
    if (isParentNode(input)) {
        if (!input.contains(element)) {
            showWarning("element root mismatch", "Provided root does not contain the element. This will most likely result in producing a fallback selector using element's real root node. If you plan to use the selector using provided root (e.g. `root.querySelector`), it will not work as intended.");
        }
        return input;
    }
    const rootNode = element.getRootNode({ composed: false });
    if (isParentNode(rootNode)) {
        if (rootNode !== document) {
            showWarning("shadow root inferred", "You did not provide a root and the element is a child of Shadow DOM. This will produce a selector using ShadowRoot as a root. If you plan to use the selector using document as a root (e.g. `document.querySelector`), it will not work as intended.");
        }
        return rootNode;
    }
    return getRootNode(element);
}
/**
 * Makes sure that the output is a number, usable as `maxResults` option in
 * powerset generator.
 */
function sanitizeMaxNumber(input) {
    return typeof input === "number" ? input : Number.POSITIVE_INFINITY;
}
/**
 * Makes sure the options object contains all required keys.
 */
function sanitizeOptions(element, custom_options = {}) {
    const options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), custom_options);
    return {
        selectors: sanitizeSelectorTypes(options.selectors),
        whitelist: sanitizeCssSelectorMatchList(options.whitelist),
        blacklist: sanitizeCssSelectorMatchList(options.blacklist),
        root: utilities_options_sanitizeRoot(options.root, element),
        combineWithinSelector: !!options.combineWithinSelector,
        combineBetweenSelectors: !!options.combineBetweenSelectors,
        includeTag: !!options.includeTag,
        maxCombinations: sanitizeMaxNumber(options.maxCombinations),
        maxCandidates: sanitizeMaxNumber(options.maxCandidates),
    };
}
//# sourceMappingURL=utilities-options.js.map
;// ./node_modules/css-selector-generator/esm/utilities-data.js


/**
 * Creates array containing only items included in all input arrays.
 */
function getIntersection(items = []) {
    const [firstItem = [], ...otherItems] = items;
    if (otherItems.length === 0) {
        return firstItem;
    }
    return otherItems.reduce((accumulator, currentValue) => {
        return accumulator.filter((item) => currentValue.includes(item));
    }, firstItem);
}
/**
 * Converts array of arrays into a flat array.
 */
function flattenArray(input) {
    return [].concat(...input);
}
/**
 * Convert string that can contain wildcards (asterisks) to RegExp source.
 */
function wildcardToRegExp(input) {
    return (input
        // convert all special characters used by RegExp, except an asterisk
        .replace(/[|\\{}()[\]^$+?.]/g, "\\$&")
        // convert asterisk to pattern that matches anything
        .replace(/\*/g, ".+"));
}
/**
 * Creates function that will test list of provided matchers against input.
 * Used for white/blacklist functionality.
 */
function createPatternMatcher(list) {
    const matchFunctions = list.map((item) => {
        if (isRegExp(item)) {
            return (input) => item.test(input);
        }
        if (typeof item === "function") {
            return (input) => {
                const result = item(input);
                if (typeof result !== "boolean") {
                    showWarning("pattern matcher function invalid", "Provided pattern matching function does not return boolean. It's result will be ignored.", item);
                    return false;
                }
                return result;
            };
        }
        if (typeof item === "string") {
            const re = new RegExp("^" + wildcardToRegExp(item) + "$");
            return (input) => re.test(input);
        }
        showWarning("pattern matcher invalid", "Pattern matching only accepts strings, regular expressions and/or functions. This item is invalid and will be ignored.", item);
        return () => false;
    });
    return (input) => matchFunctions.some((matchFunction) => matchFunction(input));
}
//# sourceMappingURL=utilities-data.js.map
;// ./node_modules/css-selector-generator/esm/utilities-dom.js



/**
 * Check whether element is matched uniquely by selector.
 */
function testSelector(elements, selector, root) {
    const result = Array.from(utilities_options_sanitizeRoot(root, elements[0]).querySelectorAll(selector));
    return (result.length === elements.length &&
        elements.every((element) => result.includes(element)));
}
/**
 * Test whether selector targets element. It does not have to be a unique match.
 */
function testMultiSelector(element, selector, root) {
    const result = Array.from(sanitizeRoot(root, element).querySelectorAll(selector));
    return result.includes(element);
}
/**
 * Find all parents of a single element.
 */
function getElementParents(element, root) {
    root = root !== null && root !== void 0 ? root : getRootNode(element);
    const result = [];
    let parent = element;
    while (isElement(parent) && parent !== root) {
        result.push(parent);
        parent = parent.parentElement;
    }
    return result;
}
/**
 * Find all common parents of elements.
 */
function getParents(elements, root) {
    return getIntersection(elements.map((element) => getElementParents(element, root)));
}
/**
 * Returns root node for given element. This needs to be used because of document-less environments, e.g. jsdom.
 */
function getRootNode(element) {
    // The `:root` selector always returns a parent node. The `null` return value is not applicable here.
    return element.ownerDocument.querySelector(":root");
}
//# sourceMappingURL=utilities-dom.js.map
;// ./node_modules/css-selector-generator/esm/constants.js

const SELECTOR_SEPARATOR = ", ";
// RegExp that will match invalid patterns that can be used in ID attribute.
const INVALID_ID_RE = new RegExp([
    "^$", // empty or not set
    "\\s", // contains whitespace
].join("|"));
// RegExp that will match invalid patterns that can be used in class attribute.
const INVALID_CLASS_RE = new RegExp([
    "^$", // empty or not set
].join("|"));
// Order in which a combined selector is constructed.
const SELECTOR_PATTERN = [
    CSS_SELECTOR_TYPE.nthoftype,
    CSS_SELECTOR_TYPE.tag,
    CSS_SELECTOR_TYPE.id,
    CSS_SELECTOR_TYPE.class,
    CSS_SELECTOR_TYPE.attribute,
    CSS_SELECTOR_TYPE.nthchild,
];
//# sourceMappingURL=constants.js.map
;// ./node_modules/css-selector-generator/esm/selector-attribute.js


// List of attributes to be ignored. These are handled by different selector types.
const attributeBlacklistMatch = createPatternMatcher([
    "class",
    "id",
    // Angular attributes
    "ng-*",
]);
/**
 * Get simplified attribute selector for an element.
 */
function attributeNodeToSimplifiedSelector({ name, }) {
    return `[${name}]`;
}
/**
 * Get attribute selector for an element.
 */
function attributeNodeToSelector({ name, value, }) {
    return `[${name}='${value}']`;
}
/**
 * Checks whether an attribute should be used as a selector.
 */
function isValidAttributeNode({ nodeName, nodeValue }, element) {
    // form input value should not be used as a selector
    const tagName = element.tagName.toLowerCase();
    if (["input", "option"].includes(tagName) && nodeName === "value") {
        return false;
    }
    // ignore Base64-encoded strings as 'src' attribute values (e.g. in tags like img, audio, video, iframe, object, embed).
    if (nodeName === "src" && (nodeValue === null || nodeValue === void 0 ? void 0 : nodeValue.startsWith("data:"))) {
        return false;
    }
    return !attributeBlacklistMatch(nodeName);
}
/**
 * Sanitize all attribute data. We want to do it once, before we start to generate simplified/full selectors from the same data.
 */
function sanitizeAttributeData({ nodeName, nodeValue }) {
    return {
        name: sanitizeSelectorItem(nodeName),
        value: sanitizeSelectorItem(nodeValue !== null && nodeValue !== void 0 ? nodeValue : undefined),
    };
}
/**
 * Get attribute selectors for an element.
 */
function getElementAttributeSelectors(element) {
    const validAttributes = Array.from(element.attributes)
        .filter((attributeNode) => isValidAttributeNode(attributeNode, element))
        .map(sanitizeAttributeData);
    return [
        ...validAttributes.map(attributeNodeToSimplifiedSelector),
        ...validAttributes.map(attributeNodeToSelector),
    ];
}
/**
 * Get attribute selectors matching all elements.
 */
function getAttributeSelectors(elements) {
    const elementSelectors = elements.map(getElementAttributeSelectors);
    return getIntersection(elementSelectors);
}
//# sourceMappingURL=selector-attribute.js.map
;// ./node_modules/css-selector-generator/esm/selector-class.js



/**
 * Get class selectors for an element.
 */
function getElementClassSelectors(element) {
    var _a;
    return ((_a = element.getAttribute("class")) !== null && _a !== void 0 ? _a : "")
        .trim()
        .split(/\s+/)
        .filter((item) => !INVALID_CLASS_RE.test(item))
        .map((item) => `.${sanitizeSelectorItem(item)}`);
}
/**
 * Get class selectors matching all elements.
 */
function getClassSelectors(elements) {
    const elementSelectors = elements.map(getElementClassSelectors);
    return getIntersection(elementSelectors);
}
//# sourceMappingURL=selector-class.js.map
;// ./node_modules/css-selector-generator/esm/selector-id.js



/**
 * Get ID selector for an element.
 * */
function getElementIdSelectors(element) {
    var _a;
    const id = (_a = element.getAttribute("id")) !== null && _a !== void 0 ? _a : "";
    const selector = `#${sanitizeSelectorItem(id)}`;
    const rootNode = element.getRootNode({ composed: false });
    return !INVALID_ID_RE.test(id) && testSelector([element], selector, rootNode)
        ? [selector]
        : [];
}
/**
 * Get ID selector for an element.
 */
function getIdSelector(elements) {
    return elements.length === 0 || elements.length > 1
        ? []
        : getElementIdSelectors(elements[0]);
}
//# sourceMappingURL=selector-id.js.map
;// ./node_modules/css-selector-generator/esm/selector-nth-child.js


/**
 * Get nth-child selector for an element.
 */
function getElementNthChildSelector(element) {
    const parent = element.parentNode;
    if (parent) {
        const siblings = Array.from(parent.childNodes).filter(isElement);
        const elementIndex = siblings.indexOf(element);
        if (elementIndex > -1) {
            return [
                `:nth-child(${String(elementIndex + 1)})`,
            ];
        }
    }
    return [];
}
/**
 * Get nth-child selector matching all elements.
 */
function getNthChildSelector(elements) {
    return getIntersection(elements.map(getElementNthChildSelector));
}
//# sourceMappingURL=selector-nth-child.js.map
;// ./node_modules/css-selector-generator/esm/selector-tag.js


/**
 * Get tag selector for an element.
 */
function getElementTagSelectors(element) {
    return [
        sanitizeSelectorItem(element.tagName.toLowerCase()),
    ];
}
/**
 * Get tag selector for list of elements.
 */
function getTagSelector(elements) {
    const selectors = [
        ...new Set(flattenArray(elements.map(getElementTagSelectors))),
    ];
    return selectors.length === 0 || selectors.length > 1 ? [] : [selectors[0]];
}
//# sourceMappingURL=selector-tag.js.map
;// ./node_modules/css-selector-generator/esm/selector-nth-of-type.js


/**
 * Get nth-of-type selector for an element.
 */
function getElementNthOfTypeSelector(element) {
    const tag = getTagSelector([element])[0];
    const parentElement = element.parentElement;
    if (parentElement) {
        const siblings = Array.from(parentElement.children).filter((element) => element.tagName.toLowerCase() === tag);
        const elementIndex = siblings.indexOf(element);
        if (elementIndex > -1) {
            return [
                `${tag}:nth-of-type(${String(elementIndex + 1)})`,
            ];
        }
    }
    return [];
}
/**
 * Get Nth-of-type selector matching all elements.
 */
function getNthOfTypeSelector(elements) {
    return getIntersection(elements.map(getElementNthOfTypeSelector));
}
//# sourceMappingURL=selector-nth-of-type.js.map
;// ./node_modules/css-selector-generator/esm/utilities-powerset.js
function* powerSetGenerator(input = [], { maxResults = Number.POSITIVE_INFINITY } = {}) {
    let resultCounter = 0;
    let offsets = generateOffsets(1);
    while (offsets.length <= input.length && resultCounter < maxResults) {
        resultCounter += 1;
        const result = offsets.map((offset) => input[offset]);
        yield result;
        offsets = bumpOffsets(offsets, input.length - 1);
    }
}
/**
 * Generates power set of input items.
 */
function getPowerSet(input = [], { maxResults = Number.POSITIVE_INFINITY } = {}) {
    return Array.from(powerSetGenerator(input, { maxResults }));
}
/**
 * Helper function used by `getPowerSet`. Updates internal pointers.
 */
function bumpOffsets(offsets = [], maxValue = 0) {
    const size = offsets.length;
    if (size === 0) {
        return [];
    }
    const result = [...offsets];
    result[size - 1] += 1;
    for (let index = size - 1; index >= 0; index--) {
        if (result[index] > maxValue) {
            if (index === 0) {
                return generateOffsets(size + 1);
            }
            else {
                result[index - 1]++;
                result[index] = result[index - 1] + 1;
            }
        }
    }
    if (result[size - 1] > maxValue) {
        return generateOffsets(size + 1);
    }
    return result;
}
/**
 * Generates array of size N, filled with numbers sequence starting from 0.
 */
function generateOffsets(size = 1) {
    return Array.from(Array(size).keys());
}
//# sourceMappingURL=utilities-powerset.js.map
;// ./node_modules/css-selector-generator/esm/utilities-cartesian.js
/**
 * Generates cartesian product out of input object.
 */
function getCartesianProduct(input = {}) {
    let result = [];
    Object.entries(input).forEach(([key, values]) => {
        result = values.flatMap((value) => {
            if (result.length === 0) {
                return [{ [key]: value }];
            }
            else {
                return result.map((memo) => (Object.assign(Object.assign({}, memo), { [key]: value })));
            }
        });
    });
    return result;
}
//# sourceMappingURL=utilities-cartesian.js.map
;// ./node_modules/css-selector-generator/esm/utilities-selectors.js













const ESCAPED_COLON = ":".charCodeAt(0).toString(16).toUpperCase();
// Square brackets need to be escaped, but eslint has a problem with that.
/* eslint-disable-next-line no-useless-escape */
const SPECIAL_CHARACTERS_RE = /[ !"#$%&'()\[\]{|}<>*+,./;=?@^`~\\]/;
/**
 * Escapes special characters used by CSS selector items.
 */
function sanitizeSelectorItem(input = "") {
    // This should not be necessary, but just to be sure, let's keep the legacy sanitizer in place, for backwards compatibility.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return CSS ? CSS.escape(input) : legacySanitizeSelectorItem(input);
}
/**
 * Legacy version of escaping utility, originally used for IE11-. Should
 * probably be replaced by a polyfill:
 * https://github.com/mathiasbynens/CSS.escape
 */
function legacySanitizeSelectorItem(input = "") {
    return input
        .split("")
        .map((character) => {
        if (character === ":") {
            return `\\${ESCAPED_COLON} `;
        }
        if (SPECIAL_CHARACTERS_RE.test(character)) {
            return `\\${character}`;
        }
        // needed for backwards compatibility
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        return escape(character).replace(/%/g, "\\");
    })
        .join("");
}
const SELECTOR_TYPE_GETTERS = {
    tag: getTagSelector,
    id: getIdSelector,
    class: getClassSelectors,
    attribute: getAttributeSelectors,
    nthchild: getNthChildSelector,
    nthoftype: getNthOfTypeSelector,
};
const ELEMENT_SELECTOR_TYPE_GETTERS = {
    tag: getElementTagSelectors,
    id: getElementIdSelectors,
    class: getElementClassSelectors,
    attribute: getElementAttributeSelectors,
    nthchild: getElementNthChildSelector,
    nthoftype: getElementNthOfTypeSelector,
};
/**
 * Creates selector of given type for single element.
 */
function getElementSelectorsByType(element, selectorType) {
    return ELEMENT_SELECTOR_TYPE_GETTERS[selectorType](element);
}
/**
 * Returns list of selectors of given type for the element.
 */
function getSelectorsByType(elements, selector_type) {
    const getter = SELECTOR_TYPE_GETTERS[selector_type];
    return getter(elements);
}
/**
 * Remove blacklisted selectors from list.
 */
function filterSelectors(list = [], matchBlacklist, matchWhitelist) {
    return list.filter((item) => matchWhitelist(item) || !matchBlacklist(item));
}
/**
 * Prioritise whitelisted selectors in list.
 */
function orderSelectors(list = [], matchWhitelist) {
    return list.sort((a, b) => {
        const a_is_whitelisted = matchWhitelist(a);
        const b_is_whitelisted = matchWhitelist(b);
        if (a_is_whitelisted && !b_is_whitelisted) {
            return -1;
        }
        if (!a_is_whitelisted && b_is_whitelisted) {
            return 1;
        }
        return 0;
    });
}
/**
 * Returns list of unique selectors applicable to given element.
 */
function getAllSelectors(elements, root, options) {
    const selectors_list = getSelectorsList(elements, options);
    const type_combinations = getTypeCombinations(selectors_list, options);
    const all_selectors = flattenArray(type_combinations);
    return [...new Set(all_selectors)];
}
/**
 * Creates object containing all selector types and their potential values.
 */
function getSelectorsList(elements, options) {
    const { blacklist, whitelist, combineWithinSelector, maxCombinations } = options;
    const matchBlacklist = createPatternMatcher(blacklist);
    const matchWhitelist = createPatternMatcher(whitelist);
    const reducer = (data, selector_type) => {
        const selectors_by_type = getSelectorsByType(elements, selector_type);
        const filtered_selectors = filterSelectors(selectors_by_type, matchBlacklist, matchWhitelist);
        const found_selectors = orderSelectors(filtered_selectors, matchWhitelist);
        data[selector_type] = combineWithinSelector
            ? getPowerSet(found_selectors, { maxResults: maxCombinations })
            : found_selectors.map((item) => [item]);
        return data;
    };
    return getSelectorsToGet(options).reduce(reducer, {});
}
/**
 * Creates list of selector types that we will need to generate the selector.
 */
function getSelectorsToGet(options) {
    const { selectors, includeTag } = options;
    const selectors_to_get = [...selectors];
    if (includeTag && !selectors_to_get.includes("tag")) {
        selectors_to_get.push("tag");
    }
    return selectors_to_get;
}
/**
 * Adds "tag" to a list, if it does not contain it. Used to modify selectors
 * list when includeTag option is enabled to make sure all results contain the
 * TAG part.
 */
function addTagTypeIfNeeded(list) {
    return list.includes(CSS_SELECTOR_TYPE.tag) ||
        list.includes(CSS_SELECTOR_TYPE.nthoftype)
        ? [...list]
        : [...list, CSS_SELECTOR_TYPE.tag];
}
/**
 * Generates list of possible selector type combinations.
 */
function combineSelectorTypes(options) {
    const { selectors, combineBetweenSelectors, includeTag, maxCandidates } = options;
    const combinations = combineBetweenSelectors
        ? getPowerSet(selectors, { maxResults: maxCandidates })
        : selectors.map((item) => [item]);
    return includeTag ? combinations.map(addTagTypeIfNeeded) : combinations;
}
/**
 * Generates list of combined CSS selectors.
 */
function getTypeCombinations(selectors_list, options) {
    return combineSelectorTypes(options)
        .map((item) => {
        return constructSelectors(item, selectors_list);
    })
        .filter((item) => item.length > 0);
}
/**
 * Generates all variations of possible selectors from provided data.
 */
function constructSelectors(selector_types, selectors_by_type) {
    const data = {};
    selector_types.forEach((selector_type) => {
        const selector_variants = selectors_by_type[selector_type];
        if (selector_variants && selector_variants.length > 0) {
            data[selector_type] = selector_variants;
        }
    });
    const combinations = getCartesianProduct(data);
    return combinations.map(constructSelector);
}
/**
 * Creates selector for given selector type. Combines several parts if needed.
 */
function constructSelectorType(selector_type, selectors_data) {
    return selectors_data[selector_type]
        ? selectors_data[selector_type].join("")
        : "";
}
/**
 * Converts selector data object to a selector.
 */
function constructSelector(selectorData = {}) {
    const pattern = [...SELECTOR_PATTERN];
    // selector "nthoftype" already contains "tag"
    if (selectorData[CSS_SELECTOR_TYPE.tag] &&
        selectorData[CSS_SELECTOR_TYPE.nthoftype]) {
        pattern.splice(pattern.indexOf(CSS_SELECTOR_TYPE.tag), 1);
    }
    return pattern
        .map((type) => constructSelectorType(type, selectorData))
        .join("");
}
/**
 * Generates combinations of child and descendant selectors within root
 * selector.
 */
function generateCandidateCombinations(selectors, rootSelector) {
    return [
        ...selectors.map((selector) => rootSelector + OPERATOR.DESCENDANT + selector),
        ...selectors.map((selector) => rootSelector + OPERATOR.CHILD + selector),
    ];
}
/**
 * Generates a list of selector candidates that can potentially match target
 * element.
 */
function generateCandidates(selectors, rootSelector) {
    return rootSelector === ""
        ? selectors
        : generateCandidateCombinations(selectors, rootSelector);
}
/**
 * Tries to find a unique CSS selector for element within given parent.
 */
function getSelectorWithinRoot(elements, root, rootSelector = "", options) {
    const elementSelectors = getAllSelectors(elements, root, options);
    const selectorCandidates = generateCandidates(elementSelectors, rootSelector);
    for (const candidateSelector of selectorCandidates) {
        if (testSelector(elements, candidateSelector, root)) {
            return candidateSelector;
        }
    }
    return null;
}
/**
 * Climbs through parents of the element and tries to find the one that is
 * identifiable by unique CSS selector.
 */
function getClosestIdentifiableParent(elements, root, rootSelector = "", options) {
    if (elements.length === 0) {
        return null;
    }
    const candidatesList = [
        elements.length > 1 ? elements : [],
        ...getParents(elements, root).map((element) => [element]),
    ];
    for (const currentElements of candidatesList) {
        const result = getSelectorWithinRoot(currentElements, root, rootSelector, options);
        if (result) {
            return {
                foundElements: currentElements,
                selector: result,
            };
        }
    }
    return null;
}
/**
 * Converts input into list of elements, removing duplicates and non-elements.
 */
function sanitizeSelectorNeedle(needle) {
    if (needle instanceof NodeList || needle instanceof HTMLCollection) {
        needle = Array.from(needle);
    }
    const elements = (Array.isArray(needle) ? needle : [needle]).filter(isElement);
    return [...new Set(elements)];
}
//# sourceMappingURL=utilities-selectors.js.map
;// ./node_modules/css-selector-generator/esm/utilities-element-data.js



/**
 * Creates data describing a specific selector.
 */
function createElementSelectorData(selector) {
    return {
        value: selector,
        include: false,
    };
}
/**
 * Creates data describing an element within CssSelector chain.
 */
function createElementData(element, selectorTypes, operator = OPERATOR.NONE) {
    const selectors = {};
    selectorTypes.forEach((selectorType) => {
        Reflect.set(selectors, selectorType, getElementSelectorsByType(element, selectorType).map(createElementSelectorData));
    });
    return {
        element,
        operator,
        selectors,
    };
}
/**
 * Constructs selector from element data.
 */
function constructElementSelector({ selectors, operator, }) {
    let pattern = [...SELECTOR_PATTERN];
    // `nthoftype` already contains tag
    if (selectors[CSS_SELECTOR_TYPE.tag] &&
        selectors[CSS_SELECTOR_TYPE.nthoftype]) {
        pattern = pattern.filter((item) => item !== CSS_SELECTOR_TYPE.tag);
    }
    let selector = "";
    pattern.forEach((selectorType) => {
        var _a;
        const selectorsOfType = (_a = selectors[selectorType]) !== null && _a !== void 0 ? _a : [];
        selectorsOfType.forEach(({ value, include }) => {
            if (include) {
                selector += value;
            }
        });
    });
    return (operator + selector);
}
//# sourceMappingURL=utilities-element-data.js.map
;// ./node_modules/css-selector-generator/esm/selector-fallback.js




/**
 * Creates fallback selector for single element.
 */
function getElementFallbackSelector(element) {
    const parentElements = getElementParents(element).reverse();
    const elementsData = parentElements.map((element) => {
        const elementData = createElementData(element, [CSS_SELECTOR_TYPE.nthchild], OPERATOR.CHILD);
        elementData.selectors.nthchild.forEach((selectorData) => {
            selectorData.include = true;
        });
        return elementData;
    });
    return [":root", ...elementsData.map(constructElementSelector)].join("");
}
/**
 * Creates chain of :nth-child selectors from root to the elements.
 */
function getFallbackSelector(elements) {
    return elements.map(getElementFallbackSelector).join(SELECTOR_SEPARATOR);
}
//# sourceMappingURL=selector-fallback.js.map
;// ./node_modules/css-selector-generator/esm/index.js





/**
 * Generates unique CSS selector for an element.
 */
function getCssSelector(needle, custom_options = {}) {
    var _a;
    const elements = sanitizeSelectorNeedle(needle);
    const options = sanitizeOptions(elements[0], custom_options);
    const root = (_a = options.root) !== null && _a !== void 0 ? _a : getRootNode(elements[0]);
    let partialSelector = "";
    let currentRoot = root;
    /**
     * Utility function to make subsequent calls shorter.
     */
    function updateIdentifiableParent() {
        return getClosestIdentifiableParent(elements, currentRoot, partialSelector, options);
    }
    let closestIdentifiableParent = updateIdentifiableParent();
    while (closestIdentifiableParent) {
        const { foundElements, selector } = closestIdentifiableParent;
        if (testSelector(elements, selector, root)) {
            return selector;
        }
        currentRoot = foundElements[0];
        partialSelector = selector;
        closestIdentifiableParent = updateIdentifiableParent();
    }
    // if failed to find single selector matching all elements, try to find
    // selector for each standalone element and join them together
    if (elements.length > 1) {
        return elements
            .map((element) => getCssSelector(element, options))
            .join(SELECTOR_SEPARATOR);
    }
    return getFallbackSelector(elements);
}
/* harmony default export */ const esm = ((/* unused pure expression or super */ null && (getCssSelector)));
//# sourceMappingURL=index.js.map
;// ./src/BlueFoxJs/bluefox.js








("use strict");
const BlueFoxJs = (() => {
  let BlueFoxJs = {
    Util: {
      deepFreeze: deepFreeze,
      getProperty: getProperty,
      getAllPath: getAllPath,
    },
    Walker: {
      walkHorizontally: walkHorizontally,
      walkVertically: walkVertically,
    },
    Selector: {
      getCssSelector: getCssSelector
    }
  };
  return BlueFoxJs;
})();

var __webpack_exports__BlueFoxJs = __webpack_exports__.T;
export { __webpack_exports__BlueFoxJs as BlueFoxJs };
