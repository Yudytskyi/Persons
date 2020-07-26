"use strict";

class DataLoader extends EventTarget {
  #_src;
  #_options;

  /**
   *
   * @param {object} [options]
   * @param {'json'|'text'|'formData'|'blob'|'arrayBuffer'} [options.parseMethod]
   */
  constructor(options = { parseMethod: "json" }) {
    super();
    this.#_src = null;
    this.#_options = options;
  }

  set src(v) {
    this.#_src = v;
    this.loadData();
  }

  get src() {
    return this.#_src;
  }

  loadData() {
    const { parseMethod, ...rest } = this.#_options;
    fetch(this.#_src, rest)
      .then((res) => res[parseMethod]())
      .then((data) => {
        this.dispatchEvent(
          new CustomEvent("load", {
            detail: data,
          })
        );
      })
      .catch((error) => {
        this.dispatchEvent(
          new CustomEvent("error", {
            detail: error,
          })
        );
      });
  }
}

export default DataLoader;
