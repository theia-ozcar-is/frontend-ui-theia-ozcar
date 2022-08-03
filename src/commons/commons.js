export function getI18n(el, lang) {
    let tmp = el.find(element => element.lang === lang);
    return tmp.text;}