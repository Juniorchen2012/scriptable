var id="9"
var s="39301"
var local="en"
// var matchdaysUrl ="https://feedmonster.onefootball.com/feeds/il/en/competitions/112/39198/matchdaysOverview.json"
// https://api.onefootball.com/scores-mixer/v1/en/cn/matchdays/6074754
//https://feedmonster.onefootball.com/feeds/il/en/competitions/112/39198/standings.json
// zh en


if(Device.locale() == "zh_CN"){
local="zh"
}
if (args.widgetParameter == "laliga") {
//laliga  
  id = 10
  s=39319
}else if (args.widgetParameter == "bundesliga") {
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
formatDate()


 var matchdaysurl=`https://feedmonster.onefootball.com/feeds/il/en/competitions/${id}/${s}/matchdaysOverview.json`
const matchjson = await get({ 'url': matchdaysurl })
var matchdayId=""
for(var matchday of matchjson.matchdays){
  if(matchday.isCurrentMatchday){
    matchdayId = matchday.id
  }
}
if(
matchdayId.length==0
){return}
var url=`https://api.onefootball.com/scores-mixer/v1/${local}/cn/matchdays/${matchdayId}`
// const requestM = new importModule('Env')()
const json = await get({ 'url': url })

const w = new ListWidget()
const bgColor = new LinearGradient()
bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")]
bgColor.locations = [0.0, 1.0]
// w.backgroundGradient = bgColor
w.backgroundColor = new Color("#222222")
var matchDate=""
var count=0
for (var item of json.kickoffs) {

   if(count>4){
    break
  }
    var date = new Date(item.kickoff)
    
  let nowa = new Date()
  let formatter = new RelativeDateTimeFormatter()
  let str = formatter.string(date, nowa)
  console.log(str)
  if(str.includes( "昨天")||str.includes("yesterday")){
    continue
  }
     
    if(date.getDate()!=matchDate){
      matchDate=date.getDate()
    const dLine = w.addText(`${str}`)
    
 
    dLine.textSize = 8
    dLine.textColor = new Color("#e587ce")
    dLine.font = Font.systemFont(13)
    w.addSpacer(2)
    }
    for (match of item.groups[0].matches) {
      count++
      var now = new Date(item.kickoff)
//       now.setTime(item.kickoff * 1000)
//       console.log(match.begin_time + now)
//       console.log(date)
      console.log(date.getHours())

      var homeScore = ''
      var awayScore = ''
      if (match.period != 'PreMatch') {
        homeScore = match.score_home
        awayScore = match.score_away
      }
      var i = 0
      var total = match.team_home.name.length
      for (i = 0; i < 5 - total; i++) {
        console.log(match.team_home.name)
        match.team_home.name += "    "

      }
      var homeWin = ""
      var awayWin = ""
//       if (homeScore > awayScore) {
//         homeWin = "🏆"
//       }
// 
//       if (homeScore < awayScore) {
//         awayWin = "🏆"
//       }


      const stack = w.addStack()
      w.addSpacer(2)
      stack.layoutHorizontally()
      stack.centerAlignContent()
      const homeimg  = await loadImage(`https://images.onefootball.com/icons/teams/56/${match.team_home.id}.png`)

//       const timeText = createTextStack(stack, `${now.getHours()}:${now.getMinutes() == 0 ? '00' : now.getMinutes()}`, 40)
const timeText = createTextStack(stack, `${now.format("hh:mm")}`, 40)
      
      const imagew = stack.addImage(homeimg)
      imagew.imageSize=new Size(20, 20)
      const homeText = createTextStack(stack, `  ${match.team_home.name} `, 100)
      homeText.leftAlignText()
      const scroeText = createTextStack(stack, `${homeWin} ${homeScore} VS ${awayScore} ${awayWin}`, 50)
      const awayText = createTextStack(stack, `    ${match.team_away.name}`, 100)
      awayText.rightAlignText()

//       if (today) {
        homeText.textOpacity = 1
        awayText.textOpacity = 1
//       }
scroeText.textOpacity=1
      if (match.period != 'PreMatch' && match.period!= 'FullTime') {
        homeText.textColor = Color.red()
        awayText.textColor = Color.red()
        scroeText.textColor = Color.red()
        
      }
      if (match.period== 'FullTime') {
        homeText.textOpacity = 0.6
        awayText.textOpacity = 0.6
        scroeText.textOpacity=0.6
      }

      const img = await loadImage(`https://images.onefootball.com/icons/teams/56/${match.team_away.id}.png`)
      const imagew1 = stack.addImage(img)
      imagew1.imageSize=new Size(20, 20)
    }
//   }

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
