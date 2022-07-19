export default class F1rf1r {
  init() {
    let parentElem = this.createHtmlElement("div", "alertMessageContainer");
    document.body.appendChild(parentElem);
  }

  /**
   *
   * @param {string} el
   * @param {string} cls
   * @returns {HTMLElement}
   */
  createHtmlElement(el, cls) {
    let htmlElement = document.createElement(el);
    htmlElement.className = cls && cls;
    return htmlElement;
  }

  synthesisText(value) {
    return value
      .replace(/</g, "")
      .replace(/>/g, "")
      .replace(/'/g, "")
      .replace(/"/g, "");
  }

  objectValidate(object, schema) {
    if (!object || !schema) return false;

    let errors = Object.keys(schema)
      .filter((key) => {
        if (schema[key].required === false) {
          if (object[key]) {
            return !schema[key].validation(object[key]);
          }
        } else {
          return !schema[key].validation(object[key]);
        }
      })
      .map((key) => new Error(schema[key].invalidError));

    return errors;
  }

  /**
   * 
   * @param {string} str 
   * @returns {HTMLElement}
   */
  stringToHtml(str) {
    let div = document.createElement("div");
    let parent = document.createElement("div");
    div.innerHTML = str.trim();
    parent.append(div);
    return parent;
  }
}

const t0ri = new F1rf1r()
t0ri.init()