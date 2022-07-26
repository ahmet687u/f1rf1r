import F1rF1r from "./f1rf1r";
import "../css/layouts/notification/_notification.scss"
import { ERROR_ICON, INFO_ICON, SUCCESS_ICON, WARNING_ICON } from "./utils/icons.js";
import { createHtmlElement, synthesisText } from "./utils/helper";

export default class Notification extends F1rF1r {
  constructor() {
    super()

    this.positions = "bottom-right"

    this.antiAnimate = {
      show: "hide",
      fadeIn: "fadeOut"
    }
  }

  /**
   * @param {String} value
   */
  set positions(value) {
    F1rF1r.root.setAttribute(`data-${this.globalOptions.initClassName}-item-direction`, value)
    this.#direction(value.split("-")[1] === "left" ? "right" : "left");
  }

  #direction(direction) {
    if (!direction) {
      return document.body.getAttribute(`data-${this.globalOptions.initClassName}-direction`)
    }

    document.body.setAttribute(`data-${this.globalOptions.initClassName}-direction`, direction)

    const cssRoot = document.querySelector(":root")
    cssRoot.style.setProperty("--fırfır-hide-translate", direction === "left" ? "100%" : "-100%")
  }

  #init(msg, param) {
    if (!msg || !param) return;
    const clearText = synthesisText(msg);

    const alertErrorMessage = createHtmlElement("div", "");
    const msgContent = document.createElement("p");

    msgContent.innerText = clearText;
    alertErrorMessage.style.animationDuration = `${{ ...F1rF1r.notificationOptions, ...param }.animate.speed}s`
    alertErrorMessage.style.animationDelay = `${param.delay}s`
    alertErrorMessage.appendChild(msgContent);

    return alertErrorMessage;
  }

  #finish(box, param) {
    const settings = { ...F1rF1r.notificationOptions, ...param }
    requestAnimationFrame(() => box?.classList?.add(settings.animate.name))

    F1rF1r.root?.appendChild(box)

    setTimeout(() => box?.classList?.add(this.antiAnimate[settings.animate.name]), param.duration);

    box.onanimationend = ({ animationName }) => animationName === this.antiAnimate[settings.animate.name] && box.remove()
  }

  error(msg, param) {
    const element = this.#init(msg, { ...F1rF1r.notificationOptions, ...param })

    element.classList.add(`${this.globalOptions.initClassName}-error`)
    element.insertAdjacentHTML("afterbegin", ERROR_ICON)

    this.#finish(element, { ...F1rF1r.notificationOptions, ...param })
  }

  success(msg, param) {
    const element = this.#init(msg, { ...F1rF1r.notificationOptions, ...param })

    element.classList.add(`${this.globalOptions.initClassName}-success`)
    element.insertAdjacentHTML("afterbegin", SUCCESS_ICON)

    this.#finish(element, { ...F1rF1r.notificationOptions, ...param })
  }

  info(msg, param){
    const element = this.#init(msg, { ...F1rF1r.notificationOptions, ...param })

    element.classList.add(`${this.globalOptions.initClassName}-info`)
    element.insertAdjacentHTML("afterbegin", INFO_ICON)

    this.#finish(element, { ...F1rF1r.notificationOptions, ...param })
  }

  warning(msg, param){
    const element = this.#init(msg, { ...F1rF1r.notificationOptions, ...param })

    element.classList.add(`${this.globalOptions.initClassName}-warning`)
    element.insertAdjacentHTML("afterbegin", WARNING_ICON)

    this.#finish(element, { ...F1rF1r.notificationOptions, ...param })
  }
}
