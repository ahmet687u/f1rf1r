import { createHtmlElement } from "./utils/helper";
import '../css/base/reset.scss'

export default class F1rF1r {
  #globalOptions;

  /**
   * @type {HTMLDivElement}
   */
  static root = null
  static modalRoot = null
  static notificationOptions = {
    duration: 3000,
    delay: null,
    animate: {
      name: "show",
      speed: .8
    }
  }

  static modalOptions = {
    msg: null,
    header: null,
    buttons: null,
    inputs: []
  }

  constructor() {
    this.#globalOptions = {
      initClassName: "fırfır",
      containerClass: "f1rf1r-notification-container",
      modalContainerClass: "f1rf1r-modal-container",
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
    F1rF1r.notificationOptions = { ...F1rF1r.notificationOptions, ...params }
  }

  /**
   * @param {Object} params
   */
  set modalSettings(params) {
    F1rF1r.modalOptions = { ...F1rF1r.modalOptions, ...params };
  }

  init() {
    const parentElem = createHtmlElement("div", this.#globalOptions.containerClass);
    const modalContainer = createHtmlElement("div", this.globalOptions.modalContainerClass);

    [parentElem, modalContainer].forEach(item => document.body.appendChild(item))

    document.body.setAttribute(`data-${this.#globalOptions.initClassName}-direction`, "left")
    F1rF1r.root = document.querySelector(`.${this.#globalOptions.containerClass}`)
    F1rF1r.modalRoot = document.querySelector(`.${this.#globalOptions.modalContainerClass}`)
  }
}