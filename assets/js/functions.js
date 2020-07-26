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
