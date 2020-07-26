"use strict";

/**
 *
 * @param {Object} params
 * @param {DOMElement} obj.parents
 * @param {string} obj.name
 * @param {Array} obj.attributes
 * @param {string} obj.innerText
 */
function addDOMElement({
  parents = document.body,
  name = "div",
  attributes = [],
  innerText = "",
}) {
  const attr = new Map(attributes);
  const chaildDOMElem = document.createElement(name);
  attr.forEach((value, name) => {
    chaildDOMElem.setAttribute(name, value);
  });
  chaildDOMElem.innerText = innerText;
  parents?.append(chaildDOMElem);
}

export default addDOMElement;
