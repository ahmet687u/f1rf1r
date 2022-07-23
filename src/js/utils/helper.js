/**
 * 
 * @param {string} el 
 * @param {string} cls 
 * @returns {HTMLElement}
 */
export const createHtmlElement = (el, cls) => {
  let htmlElement = document.createElement(el);
  htmlElement.className = cls && cls;
  return htmlElement;
}

export const synthesisText = (value) => {
  return value
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/'/g, "")
    .replace(/"/g, "");
}

export const stringToHtmlConvert = (str) => {
  const dom = document.createElement('div');
  dom.innerHTML = str;
  return dom;
}

export const objectValidate = (object, schema) => {
  if (!object || !schema) return false;

  let errors = Object.keys(schema)
    .filter((key) => {
      if (schema[key].required === false) {
        object[key] && !schema[key].validation(object[key])
        return
      }
      return !schema[key].validation(object[key]);
    })
    .map((key) => new Error(schema[key].invalidError));

  return errors;
}