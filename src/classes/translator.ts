export const LOADING_MESSSAGE = '@L@O@A@D@I@N@G@';

type ToUrl = (from: string, to: string, value: string) => string;

interface TranslatorParams {
  selector: string;
  lanaugeCodes: string[];
  toUrl: ToUrl;
}

interface TranslatorOptions {
  userAgent?: string;
  beforeTranslate?: string;
}

export default class Translator {
  lanaugeCodes: string[];
  toUrl: ToUrl;
  selector: string;
  userAgent?: string;
  beforeTranslate?: string;

  constructor(params: TranslatorParams, options?: TranslatorOptions) {
    this.lanaugeCodes = params.lanaugeCodes;
    this.toUrl = params.toUrl;
    this.selector = params.selector;
    this.userAgent = options?.userAgent;
    this.beforeTranslate = options?.beforeTranslate;
  }

  getInjectedJavascript() {
    return `
      // if beforeTranslate is set, run it
      ${this.beforeTranslate ?? ''}

      var selector = '${this.selector}'
      // Wait for the element to be loaded
      setInterval(() => {
        var result = document.querySelector(selector)
        if(result) {
          window.ReactNativeWebView.postMessage(result.innerText)
        }
        else {
          window.ReactNativeWebView.postMessage('${LOADING_MESSSAGE}')
        }
      }, 200)
    `;
  }
}
