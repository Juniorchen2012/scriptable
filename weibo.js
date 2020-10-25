var url='https://api.weibo.cn/2/!/search/hot_word?sid=v_widget&source=5786724301'
const json=await get({'url':url})
 const w = new ListWidget()
    const bgColor = new LinearGradient()
    bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")]
    bgColor.locations = [0.0, 1.0]
w.backgroundColor = new Color("#222222")
var page=1
// if(args.widgetParameter!=""){
  page=args.widgetParameter
// }
const pagesize=8
var i=(page-1)*pagesize
for (var item of json.data){
  
  if(i==page*pagesize){
    break
  }
  const stack = w.addStack()
stack.centerAlignContent()
    const ydLine = stack.addText(item.id+' '+item.word)
    ydLine.font=Font.systemFont(15)
    ydLine.textColor = new Color("#e587ce")
    ydLine.textOpacity = 0.7
//     ydLine.url=item.app_query_link
    ydLine.url='sinaweibo://searchall?q='+encodeURI(item.word)+""
//     const num=stack.addText(item.num)
//     num.font=Font.systemFont(10)
//     num.textColor = new Color("#e587ce")
//     num.textOpacity = 0.7
  if(item.flag_link.length){
    stack.addSpacer(2)
  const image = await loadImage(item.flag_link)
 
  const imgWiget=stack.addImage(image)
  imgWiget.imageSize=new Size(20, 15)
  }
//     console.log(ydLine.url)
    i++
}
// if (config.runsInWidget) {
  let widget = w
  Script.setWidget(widget)
  Script.complete()
// }else(
w.presentMedium()

async function get(opts) {
      const request = new Request(opts.url)
      request.headers = {
        ...opts.headers,
        ...this.defaultHeaders
      }
      var result=await request.loadJSON()
      console.log(result)
      return result
    
}

 async function  loadImage(imgUrl) {
  let req = new Request(imgUrl)
  let image = await req.loadImage()
  return image
}
// )
