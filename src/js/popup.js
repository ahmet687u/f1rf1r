import F1rf1r from "./fırfır";
import "../css/layouts/modal/_modal.scss"

export default class Modal extends F1rf1r {
  /**
   * @private
   */
  #defaultModalSchema;

  constructor() {
    super();
    //--- variable schema
    this.#defaultModalSchema = {
      msg: {
        required: true,
        validation: value => typeof value === "string",
        invalidError: "'msg' string bir değer olmalı. Lütfen özelliği doğru girdiğinizden emin olun"
      },
      header: {
        required: true,
        validation: value => {
          let mistakes = [];
          mistakes.push(typeof value === "object")
          Object.keys(value).map(o => mistakes.push(["showHeader", "text"].includes(o) && typeof value.showHeader === "boolean" && typeof value.text === "string"))
          return mistakes.every(c => c)
        },
        invalidError: "'header' object bir değer olmalı. Lütfen özelliği doğru girdiğinizden emin olun. Örnek header: {showHeader: boolean, text: 'string'}"
      },
      buttons: {
        required: true,
        validation: value => {
          let mistakes = [];
          mistakes.push(typeof value === "object")
          Object.keys(value).map(o => mistakes.push(["showButton", "success", "error"].includes(o) && typeof value.showButton === "boolean"))
          
          if(value.error) {
            mistakes.push(typeof value.error === "function")
          }
          if(value.success) {
            mistakes.push(typeof value.success === "function")
          }
          return mistakes.every(c => c)
        },
        invalidError: "'buttons' bir object olmalı. Lütfen özelliği doğru girdiğinizden emin olun. Örnek buttons: {showButton: boolean, success: function(), error: function()}"
      },
    };
  }

  /**
   *
   * @param {{header: object, msg: string, success: Function, error: Function}} param0
   * @returns
   */
  defaultModal({msg, header: { showHeader, text }, buttons: { success, error, showButton } }) {
    this.objectValidate(arguments[0], this.#defaultModalSchema).forEach((error) => console.error(error.message));

    if (this.objectValidate(arguments[0], this.#defaultModalSchema).length > 0) return;

    document.querySelectorAll(".tori-modal-container").forEach(item => item.remove())
    
    //--- Create html element
    const modalContainer = this.createHtmlElement("div", "tori-modal-container");
    const toriModal = this.createHtmlElement("div", "tori-modal");
    const toriHeader = this.createHtmlElement("div", "tori-modal-header");
    const toriContent = this.createHtmlElement("div", "tori-modal-content");
    const toriButtons = this.createHtmlElement("div", "tori-modal-buttons");
    const toriHeaderText = this.createHtmlElement("h3");
    const toriHeaderHide = this.createHtmlElement("div", "tori-hide-btn");
    const toriSuccessButton = this.createHtmlElement("button", "success");
    const toriErrorButton = this.createHtmlElement("button", "error");
    const toriSpan1 = this.createHtmlElement("span")
    const toriSpan2 = this.createHtmlElement("span")

    //--- Binding data
    toriHeaderText.innerHTML = this.synthesisText(text);
    toriContent.innerHTML = this.synthesisText(msg);
    toriErrorButton.innerHTML = "Hayır";
    toriSuccessButton.innerHTML = "Evet";

    //--- Add to the document
    [toriHeaderText, toriHeaderHide].forEach((c) => toriHeader.appendChild(c));
    [toriSpan1].forEach(c => toriHeaderHide.appendChild(c));
    [toriHeader, toriContent, toriButtons].forEach((c) => toriModal.appendChild(c));
    [toriSuccessButton, toriErrorButton].forEach((c) => toriButtons.appendChild(c));
    modalContainer.appendChild(toriModal);
    document.body.appendChild(modalContainer);
    setTimeout(() => modalContainer.classList.add("show-tori"), 100);
    document.body.appendChild(modalContainer);

    //--- Helper function
    const hideModal = () => {
      modalContainer.classList.remove("show-tori")
    }

    //--- Show and hide elements
    toriHeader.style.display = !showHeader && 'none'
    toriButtons.style.display = !showButton && 'none'

    //--- Events
    success && toriSuccessButton.addEventListener("click", success);
    error && toriErrorButton.addEventListener("click", error);
    [toriErrorButton, toriSuccessButton, toriHeaderHide].forEach(b => b.addEventListener("click", hideModal))
  }
}
