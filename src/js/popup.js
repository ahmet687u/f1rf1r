import F1rF1r from "./f1rf1r";
import "../css/layouts/modal/_modal.scss"
import { EXIT_ICON } from "./utils/icons";
import { synthesisText, createHtmlElement } from "./utils/helper";

export default class Modal extends F1rF1r {
  #state;

  constructor() {
    super()

    this.#state = {}

    this.buttonTextDefault = {
      error: "Hayır",
      success: "Evet"
    }
  }

  #prepare(params) {
    const fırfırModal = createHtmlElement("div", `${this.globalOptions.initClassName}-modal`);
    const modalExit = createHtmlElement("div", `${this.globalOptions.initClassName}-modal-exit`)
    const modalContent = createHtmlElement("div", `${this.globalOptions.initClassName}-modal-content`)
    const modalHeader = createHtmlElement("div", `${this.globalOptions.initClassName}-modal-header`)
    const modalButton = createHtmlElement("div", `${this.globalOptions.initClassName}-modal-buttons`)

    modalExit.innerHTML = EXIT_ICON

    if (params?.header) {
      const h2 = createHtmlElement("h2", "title")
      h2.textContent = params?.header
      modalHeader.appendChild(h2)
    }

    if (params?.buttons) {
      const error = createHtmlElement("button", "error")
      const success = createHtmlElement("button", "success");

      for (const iterator of [error, success]) {
        iterator.textContent = params.buttons[iterator.className]?.text || this.buttonTextDefault[iterator.className]
        iterator.addEventListener("click", () => {
          params.buttons[iterator.className]?.func && typeof params.buttons[iterator.className]?.func === "function" && params.buttons[iterator.className]?.func()
          this.#closeModal(fırfırModal)
        })
        iterator.style.display = !params.buttons[iterator.className] && "none"
      }

      [error, success].forEach(item => modalButton.appendChild(item))
    }

    modalButton.style.display = !params.buttons && "none";

    [modalHeader, modalContent, modalExit, modalButton].forEach(item => item && fırfırModal.appendChild(item))

    F1rF1r.modalRoot?.classList.add("show")
    fırfırModal?.classList?.add("show")

    //--- Events
    modalExit.addEventListener("click", () => this.#closeModal(fırfırModal))
    fırfırModal.onanimationend = ({ animationName }) => {
      if (animationName === "hideModal") {
        fırfırModal.remove()
        F1rF1r.modalRoot.classList.remove("show")
      }
    }

    return {
      content: modalContent,
      modalBox: fırfırModal
    }
  }

  #finish(modal) {
    F1rF1r.modalRoot.appendChild(modal)
  }

  #closeModal(modal) {
    modal.classList.add("hide")
    this.#state = {}
  }

  get data() {
    return this.#state
  }

  modal(params) {
    const settings = { ...F1rF1r.modalOptions, ...params }
    const { content, modalBox } = this.#prepare(settings)
    const text = createHtmlElement("p", "text")

    text.textContent = settings?.msg ? synthesisText(settings?.msg) : ""
    content.appendChild(text)

    this.#finish(modalBox)
  }

  formModal(params) {
    const settings = { ...F1rF1r.modalOptions, ...params }
    const { content, modalBox } = this.#prepare(settings)
    const elements = {
      inputs: {},
      labels: {},
      fields: {}
    }

    for (let i = 0; i < settings?.inputs?.length; i++) {
      elements.inputs[`input ${i}`] = createHtmlElement("input", `${this.globalOptions.initClassName}-input-${i}`)
      elements.labels[`label ${i}`] = createHtmlElement("label", `${this.globalOptions.initClassName}-label-${i}`)
      elements.fields[`field ${i}`] = createHtmlElement("div", `${this.globalOptions.initClassName}-form-field-${i}`)

      for (const [key, value] of Object.entries(settings?.inputs[i])) {
        if (key === "label") {
          elements.labels[`label ${i}`].textContent = value
          continue;
        }
        elements.inputs[`input ${i}`].setAttribute(key, value)
      }

      [elements.labels[`label ${i}`], elements.inputs[`input ${i}`]].forEach(item => elements.fields[`field ${i}`].appendChild(item))
      content.appendChild(elements.fields[`field ${i}`])
    }

    const inputs = [...content.querySelectorAll("input")]

    for (const [idx ,iterator] of inputs.entries()) {
      iterator.addEventListener("input", ({ target }) => this.#state = { ...this.#state, [target.name || `value${idx}`]: target.value })
    }

    this.#finish(modalBox)
  }
}
