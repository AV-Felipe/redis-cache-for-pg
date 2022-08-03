const Redis = require('ioredis')
const redis = new Redis(6379, 'cache')

module.exports = {
  /** middleware function to check cache before continuing to any endpoint handlers */
  async checkResponseCache (req,res, next) {
    const {page} = req.params;
    const cachedResponse = await redis.get(page)
    if (cachedResponse) { // If cache hit
      return res.json(JSON.parse(cachedResponse)) // return the cached response
    } else {
      return next() // only continue if result not in cache
    }
  },
  /** middleware function to insert response into cache */
  async addResponseToCache (req, res, next) {
    await next() // Wait until other handlers have finished
    if (res.body && res.status === 200) { // If request was successful
      // Cache the response
      await redis.set(req.params, JSON.stringify(res.body))
    }
  }
}