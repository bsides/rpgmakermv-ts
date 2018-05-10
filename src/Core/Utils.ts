//-----------------------------------------------------------------------------
/**
 * The static class that defines utility methods.
 *
 * @class Utils
 */
export default class Utils {
  constructor() {
    throw new Error('This is a static class')
  }

  /**
   * The name of the RPG Maker. 'MV' in the current version.
   *
   * @static
   * @property RPGMAKER_NAME
   * @type String
   * @final
   */
  static RPGMAKER_NAME: string = 'MV'

  /**
   * The version of the RPG Maker.
   *
   * @static
   * @property RPGMAKER_VERSION
   * @type String
   * @final
   */
  static RPGMAKER_VERSION: string = '1.5.2'

  /**
   * Checks whether the option is in the query string.
   *
   * @static
   * @method isOptionValid
   * @param {String} name The option name
   * @return {Boolean} True if the option is in the query string
   */
  static isOptionValid(name: string): boolean {
    return location.search
      .slice(1)
      .split('&')
      .contains(name)
  }

  /**
   * Checks whether the platform is NW.js.
   *
   * @static
   * @method isNwjs
   * @return {Boolean} True if the platform is NW.js
   */
  static isNwjs(): boolean {
    return typeof require === 'function' && typeof process === 'object'
  }

  /**
   * Checks whether the platform is a mobile device.
   *
   * @static
   * @method isMobileDevice
   * @return {Boolean} True if the platform is a mobile device
   */
  static isMobileDevice(): boolean {
    const r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return !!navigator.userAgent.match(r)
  }

  /**
   * Checks whether the browser is Mobile Safari.
   *
   * @static
   * @method isMobileSafari
   * @return {Boolean} True if the browser is Mobile Safari
   */
  static isMobileSafari(): boolean {
    const agent = navigator.userAgent
    return !!(
      agent.match(/iPhone|iPad|iPod/) &&
      agent.match(/AppleWebKit/) &&
      !agent.match('CriOS')
    )
  }

  /**
   * Checks whether the browser is Android Chrome.
   *
   * @static
   * @method isAndroidChrome
   * @return {Boolean} True if the browser is Android Chrome
   */
  static isAndroidChrome(): boolean {
    const agent = navigator.userAgent
    return !!(agent.match(/Android/) && agent.match(/Chrome/))
  }

  /**
   * Checks whether the browser can read files in the game folder.
   *
   * @static
   * @method canReadGameFiles
   * @return {Boolean} True if the browser can read files in the game folder
   */
  static canReadGameFiles(): boolean {
    const scripts = document.getElementsByTagName('script')
    const lastScript = scripts[scripts.length - 1]
    const xhr = new XMLHttpRequest()
    try {
      xhr.open('GET', lastScript.src)
      xhr.overrideMimeType('text/javascript')
      xhr.send()
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Makes a CSS color string from RGB values.
   *
   * @static
   * @method rgbToCssColor
   * @param {Number} r The red value in the range (0, 255)
   * @param {Number} g The green value in the range (0, 255)
   * @param {Number} b The blue value in the range (0, 255)
   * @return {String} CSS color string
   */
  static rgbToCssColor(r: number, g: number, b: number): string {
    r = Math.round(r)
    g = Math.round(g)
    b = Math.round(b)
    return 'rgb(' + r + ',' + g + ',' + b + ')'
  }

  static _id = 1
  static generateRuntimeId() {
    return Utils._id++
  }

  static _supportPassiveEvent: boolean | null = null
  /**
   * Test this browser support passive event feature
   *
   * @static
   * @method isSupportPassiveEvent
   * @return {Boolean} this browser support passive event or not
   */
  static isSupportPassiveEvent(): boolean | null {
    if (typeof Utils._supportPassiveEvent === 'boolean') {
      return Utils._supportPassiveEvent
    }
    // test support passive event
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
    let passive = false
    const options = Object.defineProperty({}, 'passive', {
      get: function() {
        passive = true
      }
    })
    window.addEventListener('test', null, options)
    Utils._supportPassiveEvent = passive
    return passive
  }
}
