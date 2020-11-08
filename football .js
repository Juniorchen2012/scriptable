var id="9"
var s="39301"
var local="en"
// var matchdaysUrl ="https://feedmonster.onefootball.com/feeds/il/en/competitions/1/39285/matchdaysOverview.json"
// zh en

var title=`Team                            P       W/D/L      Goals      Points`
if(Device.locale() == "zh_CN"){
title=`球队                              赛   胜/平/负     进/失      积分`
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
}
//You can find more ids and s value here:https://github.com/Juniorchen2012/scriptable/blob/master/footballLeagueData
var url=`https://feedmonster.onefootball.com/feeds/il/${local}/competitions/${id}/${s}/standings.json`
var iconUrl=`https://images.onefootball.com/icons/leagueColoredCompetition/64/${id}.png`

// const requestM = new importModule('Env')()
const json = await get({ 'url': url })

const w = new ListWidget()
w.backgroundColor = new Color("#36033B")
const bg = await drawBg(iconUrl)
w.backgroundImage=bg
// w.backgroundImage=readBgImage()
const titlew= w.addText(title)
titlew.textColor = new Color("#e587ce")
titlew.font = Font.boldSystemFont(13)
var i = 0
for (var item of json.groups[0].ranking) {
  if (i == 6) { break }
  var j = 0
  var total = item.team.name.length
  const stack = w.addStack()
  stack.layoutHorizontally()
  stack.centerAlignContent()
  const image = await loadImage(`https://images.onefootball.com/icons/teams/56/${item.team.idInternal}.png`)
  const imgwidget=stack.addImage(image)
  imgwidget.imageSize=new Size(16, 16)
const stats=item.team.teamstats
createTextStack(stack, `${item.team.name}`, 100)
createTextStack(stack,`${stats.played}`,30)
  createTextStack(stack, `${stats.won}/${stats.drawn}/${stats.lost}`, 60)
  createTextStack(stack, `${stats.goalsShot}/${stats.goalsGot}`, 60)
  createTextStack(stack, `${stats.points}`, 30)
 w.addSpacer(2)
  i++
}
w.presentMedium()
if (config.runsInWidget) {
  let widget = w
  Script.setWidget(widget)
   Script.complete()
}

function readBgImage() {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let filePath = fm.joinPath(dir, "PL.png")
  return fm.readImage(filePath)
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
