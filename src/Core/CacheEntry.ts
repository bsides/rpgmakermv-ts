//-----------------------------------------------------------------------------
/**
 * The resource class. Allows to be collected as a garbage if not use for some time or ticks
 *
 * @class CacheEntry
 * @constructor
 * @param {ResourceManager} resource manager
 * @param {string} key, url of the resource
 * @param {string} item - Bitmap, HTML5Audio, WebAudio - whatever you want to store in the cache
 */
export default class CacheEntry {
  constructor(cache: any, key: string, item: string) {
    this.cache = cache
    this.key = key
    this.item = item
    this.cached = false
    this.touchTicks = 0
    this.touchSeconds = 0
    this.ttlTicks = 0
    this.ttlSeconds = 0
    this.freedByTTL = false
  }

  /**
   * frees the resource
   */
  free = byTTL => {
    this.freedByTTL = byTTL || false
    if (this.cached) {
      this.cached = false
      delete this.cache._inner[this.key]
    }
  }

  /**
   * Allocates the resource
   * @returns {CacheEntry}
   */
  allocate = (): CacheEntry => {
    if (!this.cached) {
      this.cache._inner[this.key] = this
      this.cached = true
    }
    this.touch()
    return this
  }

  /**
   * Sets the time to live
   * @param {number} ticks TTL in ticks, 0 if not set
   * @param {number} time TTL in seconds, 0 if not set
   * @returns {CacheEntry}
   */
  setTimeToLive = (ticks: number, seconds): CacheEntry => {
    this.ttlTicks = ticks || 0
    this.ttlSeconds = seconds || 0
    return this
  }

  isStillAlive = () => {
    const cache = this.cache
    return (
      (this.ttlTicks == 0 ||
        this.touchTicks + this.ttlTicks < cache.updateTicks) &&
      (this.ttlSeconds == 0 ||
        this.touchSeconds + this.ttlSeconds < cache.updateSeconds)
    )
  }

  /**
   * makes sure that resource wont freed by Time To Live
   * if resource was already freed by TTL, put it in cache again
   */
  touch = () => {
    var cache = this.cache
    if (this.cached) {
      this.touchTicks = cache.updateTicks
      this.touchSeconds = cache.updateSeconds
    } else if (this.freedByTTL) {
      this.freedByTTL = false
      if (!cache._inner[this.key]) {
        cache._inner[this.key] = this
      }
    }
  }
}
