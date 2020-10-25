// progress
const width=125
const h=5
const w = new ListWidget()
w.backgroundColor=new Color("#222222")

const now = new Date()
const weekday = now.getDay() == 0 ? 6 : now.getDay() - 1
const minutes=now.getMinutes() 
if(Device.locale() == "zh_CN"){
getwidget(24*60, (now.getHours() + 1)*60+minutes, "今日")
getwidget(7, weekday + 1, "本周")
getwidget(30, now.getDate() + 1, "本月")
getwidget(12, now.getMonth() + 1, "今年")
}else{

getwidget(24*60, (now.getHours() + 1)*60+minutes, "Today")
getwidget(7, weekday + 1, "This week")
getwidget(30, now.getDate() + 1, "This month")
getwidget(12, now.getMonth() + 1, "This year")
}
Script.setWidget(w)
Script.complete()
w.presentMedium()

function getwidget(total, haveGone, str) {
  const titlew = w.addText(str)
  titlew.textColor = new Color("#e587ce")
  titlew.font = Font.boldSystemFont(13)
  w.addSpacer(6)
  const imgw = w.addImage(creatProgress(total,haveGone))
  imgw.imageSize=new Size(width, h)
  w.addSpacer(6)
}

function creatProgress(total,havegone){
const context =new DrawContext()
context.size=new Size(width, h)
context.opaque=false
context.respectScreenScale=true
context.setFillColor(new Color("#48484b"))
const path = new Path()
path.addRoundedRect(new Rect(0, 0, width, h), 3, 2)
context.addPath(path)
context.fillPath()
context.setFillColor(new Color("#ffd60a"))
const path1 = new Path()
path1.addRoundedRect(new Rect(0, 0, width*havegone/total, h), 3, 2)
context.addPath(path1)
context.fillPath()
return context.getImage()
}

