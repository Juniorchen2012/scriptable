// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: futbol;
var url = "https://feedmonster.onefootball.com/feeds/il/en/competitions/9/39301/standings.json"
if (args.widgetParameter == "inter") {

} else if (args.widgetParameter == "liga") {
 
}
const requestM = new importModule('Env')()
const json = await requestM.get({ 'url': url })

const w = new ListWidget()
w.backgroundColor = new Color("#36033B")
w.backgroundImage=readBgImage()
const titlew = w.addText(`Team                            P       W/D/L      Goals      Points`)

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
  const image = await requestM.loadImage(`https://images.onefootball.com/icons/teams/56/${item.team.idInternal}.png`)
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
