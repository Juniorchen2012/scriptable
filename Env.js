// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: terminal;
module.exports =  () => {
  return new(class {
    constructor() {
      this.request = new Request('')
      this.defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }

    async get(opts) {
      this.request.url = opts.url
      this.request.headers = {
        ...opts.headers,
        ...this.defaultHeaders
      }
      var result=await this.request.loadJSON()
      console.log(result)
      return result
    }
    async  loadImage(imgUrl) {
  let req = new Request(imgUrl)
  let image = await req.loadImage()
  return image
}

    async post(opts) {
      const request = new Request(opts.url)
      request.body = JSON.stringify(opts.body)
      request.method = 'POST'
      request.headers = {
        ...opts.headers,
        ...this.defaultHeaders
      }
     
       var result=await request.loadJSON()
      console.log(result)
      return result
    }
    
  })()
}