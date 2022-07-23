import F1rF1r from "./f1rf1r";
import "../css/layouts/modal/_modal.scss"
import { EXIT_ICON } from "./utils/icons";
import { synthesisText, createHtmlElement } from "./utils/helper";

export default class Modal extends F1rF1r {
  constructor() {
    super()
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
      const buttonError = createHtmlElement("button", "error")
      const buttonSuccess = createHtmlElement("button", "success")

      [buttonError, buttonSuccess].forEach(item => modalButton.appendChild(item))
    }

    modalButton.style.display = !params.buttons && "none";

    [modalHeader, modalContent, modalExit, modalButton].forEach(item => fırfırModal.appendChild(item))

    F1rF1r.modalRoot?.classList.add("show")
    fırfırModal?.classList?.add("show")

    //--- Events
    modalExit.addEventListener("click", () => F1rF1r.modalRoot?.querySelector(`.${this.globalOptions.initClassName}-modal`)?.classList.add("hide"))
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

  modal(params) {
    const { content, modalBox } = this.#prepare(params)
    const text = createHtmlElement("p", "text")

    text.textContent = synthesisText(params?.msg)
    content.appendChild(text)

    this.#finish(modalBox)
  }

  formModal(params) {
    const { content, modal } = this.#prepare(params)
    console.log("haloo !...");

    this.#finish(modal)
  }
}
