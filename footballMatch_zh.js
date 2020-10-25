var url = "https://gdc-soccerapi.hupu.com/soccer/match-data/v2/matches?time_zone=Asia%2FShanghai&client=5C60A99C-665D-4CEC-A118-E68E521BAE89&V=7.5.17&night=1&crt=1598326351&clientId=80798096&O=I&leagueId=epl&bddid=69854780823&sign=0616f65886053d9ce49dec521e33cb01&preload=0"
if (args.widgetParameter == "csl") {
  url = "https://gdc-soccerapi.hupu.com/soccer/match-data/v2/matches?time_zone=Asia%2FShanghai&client=5C60A99C-665D-4CEC-A118-E68E521BAE89&V=7.5.17&night=1&crt=1598277522&clientId=80798096&O=I&leagueId=csl&bddid=69854780823&sign=2e301d59f25508c3a2ee108aea281b67&preload=0"
} else if (args.widgetParameter == "laliga") {
  url = "https://gdc-soccerapi.hupu.com/soccer/match-data/v2/matches?time_zone=Asia%2FShanghai&client=5C60A99C-665D-4CEC-A118-E68E521BAE89&V=7.5.20&night=0&crt=1601118846&clientId=80798096&O=I&leagueId=liga&bddid=69854780823&sign=bf53920140be9ace18f7c1d4e00c9511&preload=0"
}
// const requestM = new importModule('Env')()
const json = await get({ 'url': url })

const w = new ListWidget()
const bgColor = new LinearGradient()
bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")]
bgColor.locations = [0.0, 1.0]
// w.backgroundGradient = bgColor
w.backgroundColor = new Color("#222222")

for (var item of json.result.games) {
  var today = Boolean(item.date_block.indexOf('今日') != -1)
  var torm = Boolean(item.date_block.indexOf('明日') != -1)
  if (today || torm) {

    const dLine = w.addText(`${item.date_block}`)
    dLine.textSize = 8
    dLine.textColor = new Color("#e587ce")
    dLine.font = Font.systemFont(13)
    for (match of item.data) {
      var date = new Date(match.begin_time)
      var now = new Date()
      now.setTime(match.begin_time * 1000)
      console.log(match.begin_time + now)
      console.log(date)
      console.log(date.getHours())

      var homeScore = ''
      var awayScore = ''
      if (match.status.desc != '未开始') {
        homeScore = match.home_score
        awayScore = match.away_score
      }
      var i = 0
      var total = match.home.name.length
      for (i = 0; i < 5 - total; i++) {
        console.log(match.home.name)
        match.home.name += "    "

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
      stack.layoutHorizontally()
      stack.centerAlignContent()
      var homeimg = await loadImage(match.home.logo)

      const timeText = createTextStack(stack, `${now.getHours()}:${now.getMinutes() == 0 ? '00' : now.getMinutes()}`, 40)
      
      const imagew = stack.addImage(homeimg)
      imagew.imageSize=new Size(20, 20)
      const homeText = createTextStack(stack, `  ${match.home.name} ${homeWin}`, 100)
      homeText.leftAlignText()
      const scroeText = createTextStack(stack, `${homeScore} VS ${awayScore}`, 50)
      const awayText = createTextStack(stack, `${awayWin}    ${match.away.name}`, 100)
      awayText.rightAlignText()

      if (today) {
        homeText.textOpacity = 1
        awayText.textOpacity = 1
      }

      if (match.status.desc != '未开始' && match.status.desc != '已结束') {
        homeText.textColor = Color.red()
        awayText.textColor = Color.red()
      }
      if (match.status.desc == '已结束') {
        homeText.textOpacity = 0.6
        awayText.textOpacity = 0.6
      }

      var img = await loadImage(match.away.logo)
      const imagew1 = stack.addImage(img)
      imagew1.imageSize=new Size(20, 20)
    }
  }

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
