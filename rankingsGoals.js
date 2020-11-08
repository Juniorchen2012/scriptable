var id="9"
var s="39301"
var local="en"
//You can find more ids and s value here:https://github.com/Juniorchen2012/scriptable/blob/master/footballLeagueData
if(Device.locale() == "zh_CN"){
local="zh"
}
if (args.widgetParameter == "laliga") {
//laliga  
  id = 10
  s=39319
}else if (args.widgetParameter == "bl") {
//bundesliga  
id=1
s=39285
} else if (args.widgetParameter == "sa") {
//serie A
id=13
s=39325
}else if (args.widgetParameter == "lue") {
//ligue1 uber eats
   id=23
  s=39245
}else if (args.widgetParameter == "efl") {
//ligue1 uber eats
   id=41
  s=39296
}

formatDate()

var iconUrl=`https://images.onefootball.com/icons/leagueColoredCompetition/64/${id}.png`
const bg = await drawBg(iconUrl)

 var url=`https://feedmonster.onefootball.com/feeds/il/en/competitions/${id}/${s}/league_statistics.json`
const json = await get({ 'url': url })

const w = new ListWidget()
const bgColor = new LinearGradient()
bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")]
bgColor.locations = [0.0, 1.0]
// w.backgroundGradient = bgColor
w.backgroundColor = new Color("#222222")
w.backgroundImage=bg
var matchDate=""
var count=0
for (var item of json.scorers) {
   if(count>4){
    break
  }
   
      count++

      const stack = w.addStack()
//       stack.backgroundColor= new Color("#25282a")
      w.addSpacer(2)
      stack.layoutHorizontally()
      
      stack.centerAlignContent()
      stack.setPadding(0, 0, 0, 0)
      const img  = await loadImage(item.thumbnailSrc)
//  stack.addSpacer(20)
// const indexImg=stack.addImage(SFSymbol.named("0.circle").image)
// indexImg.imageSize=new Size(20, 20)
createTextStack(stack, `  ${item.index} `, 30)
      const imagew = stack.addImage(img)
      imagew.imageSize=new Size(25, 25)
     
      const nameText = createTextStack(stack, `  ${item.name} `, 130)
      nameText.leftAlignText()
      const awayText = createTextStack(stack, `${item.seasonGoals}⚽️`, 30)
//       awayText.rightAlignText()
stack.addSpacer(5)
const teamimg  = await loadImage(`https://images.onefootball.com/icons/teams/56/${item.internalTeamId}.png`)
 const teamimagew = stack.addImage(teamimg)
      teamimagew.imageSize=new Size(25, 25)
//       stack.addSpacer(40)
      w.addSpacer(3)
}
w.presentMedium()
if (config.runsInWidget) {
  let widget = w
  Script.setWidget(widget)
  Script.complete()
}

function createTextStack(stack, text, width) {
  const tmpStack = stack.addStack()
  tmpStack.size = new Size(width, 20)
  const widgetText = tmpStack.addText(text)
  widgetText.font = Font.systemFont(13)
  //       homeText.textColor = new Color("#e587ce")
  widgetText.textColor = Color.white()
  widgetText.textOpacity = 0.6
  return widgetText
}

// QuickLook.present(table)
async function loadImage(imgUrl) {
  let req = new Request(imgUrl)
  let image = await req.loadImage()
  return image
}

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

function formatDate() {
  Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}       

}

async function drawBg(iconUrl){
 const image = await loadImage(iconUrl)
const context =new DrawContext()
context.size=new Size(300, 200)
context.opaque=false
context.respectScreenScale=true
context.setFillColor(new Color("#36033B"))
context.fill(new Rect(0,0,300,200))
context.drawImageInRect(image, new Rect(255, 80, 40, 40))
return context.getImage()
}
