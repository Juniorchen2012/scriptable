var twitter = "Juniorchen2012"
if(args.widgetParameter){
  twitter=args.widgetParameter
}

const w = new ListWidget()
w.url="twitter://"
w.backgroundColor = new Color("#1da0f2")

const resp= await get({url:`https://counts.live/api/twitter-follower-count/${twitter}/data`,headers:{"Cookie": "__cfduid=d0e779c9e83b5126547bd5f43991b41da1606145300","Referer":`https://counts.live/twitter-follower-count/${twitter}`}})

  const stack =w.addStack()
const img= await loadImage(`https://res.cloudinary.com/dzd0tndsx/image/twitter_name/${twitter}.jpg`)
const imgw =stack.addImage(img)
imgw.cornerRadius=35
imgw.imageSize=new Size(70, 70)
stack.addSpacer(30)
const logo= await loadImage(`https://ftp.bmp.ovh/imgs/2020/11/dd092ebfad4ecdd4.jpeg`)
const logoimgw =stack.addImage(logo)
logoimgw.cornerRadius=30
logoimgw.imageSize=new Size(50, 50)

w.addSpacer(10)

let item = addTextToListWidget(`@${resp.data.lv_identifier}`)
item.font = Font.boldSystemFont(16)
item.lineLimit=1
let follower=addTextToListWidget(numberWithCommas(`${resp.data.followers}`))
follower.font=Font.boldSystemFont(25)
// addTextToListWidget(`Follwing:${resp.data.following}`)
//  addTextToListWidget(`Tweets:  ${resp.data.tweets}`)
Script.setWidget(w)
Script.complete()
w.presentSmall()
function addTextToListWidget(text) {
  let item = w.addText(text)
  item.textColor = Color.white()
//   item.textOpacity = 0.7
  item.font = Font.systemFont(15)
//   item.textSize = size
  return item
}

async function get(opts) {
      const request = new Request(opts.url)
      request.headers = {
        ...opts.headers,
        ...this.defaultHeaders
      }
      var result=await request.loadJSON()
      return result
    
}

function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 async function  loadImage(imgUrl) {
  let req = new Request(imgUrl)
  let image = await req.loadImage()
  return image
}
