interface String {
  padZero(length: number): string
  format(): string
  contains(string: string): boolean
}

interface Number {
  clamp(min: number, max: number): number
  mod(n: number): number
  padZero(length: number): string
}

interface Array<T> {
  equals(array: Array<any>): boolean
  clone(): Array<any>
  contains(element: any): boolean
}

interface Math {
  randomInt(max: number): number
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @method Number.prototype.clamp
 * @param {Number} min The lower boundary
 * @param {Number} max The upper boundary
 * @return {Number} A number in the range (min, max)
 */
Number.prototype.clamp = function(
  this: number,
  min: number,
  max: number
): number {
  return Math.min(Math.max(this, min), max)
}

/**
 * Returns a modulo value which is always positive.
 *
 * @method Number.prototype.mod
 * @param {Number} n The divisor
 * @return {Number} A modulo value
 */
Number.prototype.mod = function(this: number, n: number): number {
  return (this % n + n) % n
}

/**
 * Replaces %1, %2 and so on in the string to the arguments.
 *
 * @method String.prototype.format
 * @param {Any} ...args The objects to format
 * @return {String} A formatted string
 */
String.prototype.format = function(): string {
  var args = arguments
  return this.replace(/%([0-9]+)/g, function(s, n) {
    return args[Number(n) - 1]
  })
}

/**
 * Makes a number string with leading zeros.
 *
 * @method String.prototype.padZero
 * @param {Number} length The length of the output string
 * @return {String} A string with leading zeros
 */
String.prototype.padZero = function(this: string, length: number): string {
  var s = this
  while (s.length < length) {
    s = '0' + s
  }
  return s
}

/**
 * Makes a number string with leading zeros.
 *
 * @method Number.prototype.padZero
 * @param {Number} length The length of the output string
 * @return {String} A string with leading zeros
 */
Number.prototype.padZero = function(length: number): string {
  return String(this).padZero(length)
}

/**
 * Checks whether the two arrays are same.
 *
 * @method Array.prototype.equals
 * @param {Array} array The array to compare to
 * @return {Boolean} True if the two arrays are same
 */
Array.prototype.equals = function(array: Array<any>): boolean {
  if (!array || this.length !== array.length) {
    return false
  }
  for (var i = 0; i < this.length; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i])) {
        return false
      }
    } else if (this[i] !== array[i]) {
      return false
    }
  }
  return true
}

/**
 * Makes a shallow copy of the array.
 *
 * @method Array.prototype.clone
 * @return {Array} A shallow copy of the array
 */
Array.prototype.clone = function(): Array<any> {
  return this.slice(0)
}
/**
 * Checks whether the array contains a given element.
 *
 * @method Array.prototype.contains
 * @param {Any} element The element to search for
 * @return {Boolean} True if the array contains a given element
 */
Array.prototype.contains = function(element: any): boolean {
  return this.indexOf(element) >= 0
}

/**
 * Checks whether the string contains a given string.
 *
 * @method String.prototype.contains
 * @param {String} string The string to search for
 * @return {Boolean} True if the string contains a given string
 */
String.prototype.contains = function(string: string): boolean {
  return this.indexOf(string) >= 0
}

/**
 * Generates a random integer in the range (0, max-1).
 *
 * @static
 * @method Math.randomInt
 * @param {Number} max The upper boundary (excluded)
 * @return {Number} A random integer
 */
Math.randomInt = function(max: number): number {
  return Math.floor(max * Math.random())
}
