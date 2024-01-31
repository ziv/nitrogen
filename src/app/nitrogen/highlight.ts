import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';


export function init() {
  hljs.configure({ignoreUnescapedHTML: true})
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('typescript', typescript);
}

export function highlight(el: HTMLElement) {
  hljs.highlightElement(el);
}
