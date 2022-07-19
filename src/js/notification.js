import F1rf1r from "./fırfır.js";
import "../css/layouts/notification/_notification.scss"

export default class Notification extends F1rf1r {
  /**
   * @private
   */
  #position;
  #options;

  constructor() {
    super();

    this.#options = {}

    this.root = document.querySelector(".alertMessageContainer");
    this.positions = "bottom-right"
    this.#position = "left"
  }

  /**
   * @param {String} value
   */
  set positions(value) {
    this.root.className = "alertMessageContainer"
    value.split("-").forEach(c => this.root.classList.add(c))
    this.#position = value.split("-")[1] === "left" ? "right" : "left";
  }

  /**
   * @param {Object} value
   */
  set options(value) {
    this.#options = value
  }

  #init(msg, param) {
    if (!msg || !param) return;
    const clearText = this.synthesisText(msg);

    let alertErrorMessage = this.createHtmlElement("div", this.#position);
    let msgContent = document.createElement("p");

    msgContent.innerText = clearText;
    alertErrorMessage.style.transitionDelay = `${param.delay}s`
    alertErrorMessage.appendChild(msgContent);

    return alertErrorMessage;
  }

  #finish(box, param) {
    requestAnimationFrame(() => box.classList.add("active"))

    this.root.appendChild(box)

    setTimeout(() => box.classList.add("hide"), param.duration);
    setTimeout(() => box.remove(), param.duration + 800);
  }

  error(msg, param) {
    const settings = { ...this.#options, ...param }
    const element = this.#init(msg, settings)

    element.classList.add("alertError")

    this.#finish(element, settings)
  }

  success(msg, param) {
    const settings = { ...this.#options, ...param }
    const element = this.#init(msg, param)

    element.classList.add("alertSuccess")
    this.#finish(element, settings)
  }
}
