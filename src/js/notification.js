import F1rF1r from "./f1rf1r";
import "../css/layouts/notification/_notification.scss"
import { ERROR_ICON, SUCCESS_ICON } from "./utils/icons.js";
import { createHtmlElement, synthesisText } from "./utils/helper";

export default class Notification extends F1rF1r {
  #position;
  #options;

  constructor() {
    super()

    this.positions = "bottom-right"
    this.#position = "left"
  }

  /**
   * @param {String} value
   */
   set positions(value) {
    value.split("-").forEach(c => F1rF1r.root.classList.add(c))
    this.#position = value.split("-")[1] === "left" ? "right" : "left";
  }

  #init(msg, param) {
    if (!msg || !param) return;
    const clearText = synthesisText(msg);

    const alertErrorMessage = createHtmlElement("div", this.#position);
    const msgContent = document.createElement("p");

    msgContent.innerText = clearText;
    alertErrorMessage.style.animationDelay = `${param.delay}s`
    alertErrorMessage.appendChild(msgContent);

    return alertErrorMessage;
  }

  #finish(box, param) {
    requestAnimationFrame(() => box?.classList?.add("active"))

    F1rF1r.root?.appendChild(box)

    setTimeout(() => box?.classList?.add("hide"), param.duration);

    box.onanimationend = ({ animationName }) => {
      animationName === "show" && param?.animation && box?.classList?.add(param?.animation)
      animationName === "hide" && box.remove()
    }
  }

  error(msg, param) {
    const settings = { ...F1rF1r.notificationOptions, ...param }
    const element = this.#init(msg, settings)

    element.classList.add(`${this.globalOptions.initClassName}-error`)
    element.insertAdjacentHTML("afterbegin", ERROR_ICON)

    this.#finish(element, settings)
  }

  success(msg, param) {
    const settings = { ...F1rF1r.notificationOptions, ...param }
    const element = this.#init(msg, settings)

    element.classList.add(`${this.globalOptions.initClassName}-success`)
    element.insertAdjacentHTML("afterbegin", SUCCESS_ICON)

    this.#finish(element, settings)
  }
}
