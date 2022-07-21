import { createHtmlElement } from "./utils/helper";

export default class F1rF1r {
  #globalOptions;

  /**
   * @type {HTMLDivElement}
   */
  static root = null
  static notificationOptions

  constructor() {
    this.#globalOptions = {
      initClassName: "fırfır",
      containerClass: "f1rf1r-container",
      windowStatus: "not-loaded"
    }

    window.addEventListener("DOMContentLoaded", () => this.#globalOptions.windowStatus = "loaded")
  }

  get globalOptions() {
    return this.#globalOptions
  }

  /**
   * @param {Object} params
   */
  set notificationSettings(params) {
    F1rF1r.notificationOptions = params
  }

  init() {
    let parentElem = createHtmlElement("div", this.#globalOptions.containerClass);
    document.body.appendChild(parentElem);

    F1rF1r.root = document.querySelector(`.${this.#globalOptions.containerClass}`)
  }
}