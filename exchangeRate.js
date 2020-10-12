// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: dollar-sign;
// {"CAD":1.5542,"HKD":9.1412,"ISK":162.8,"PHP":57.083,"DKK":7.4422,"HUF":356.28,"CZK":27.11,"AUD":1.6405,"RON":4.8715,"SEK":10.42,"IDR":17340.01,"INR":86.1985,"BRL":6.5796,"RUB":90.9413,"HRK":7.5765,"JPY":124.95,"THB":36.629,"CHF":1.0773,"SGD":1.5986,"PLN":4.4702,"BGN":1.9558,"TRY":9.3279,"CNY":7.9047,"NOK":10.8623,"NZD":1.7821,"ZAR":19.4315,"USD":1.1795,"MXN":25.0833,"ILS":3.9859,"GBP":0.91167,"KRW":1350.52,"MYR":4.8808}

const w = new ListWidget()
w.backgroundColor = new Color("#222222")
const req = new importModule("Env")()
const resp= await req.get({url:"https://api.exchangeratesapi.io/latest?symbols=CNY,GBP,CAD,RUB,JPY,AUD&base=USD"})
// symbols=CNY,GBP&
for(let rate in resp.rates){
//   console.log(rate)
//   console.log(resp.rates[rate])
  const stack =w.addStack()
  stack.centerAlignContent()
  const img= await req.loadImage("https://www.ecb.europa.eu/shared/img/flags/"+rate+".gif")
  const imgw =stack.addImage(img)
  imgw.imageSize=new Size(20, 20)
  stack.addSpacer(10)
  stack.addText(rate)
  stack.addSpacer(10)
  const textw = stack.addText(resp.rates[rate].toFixed(2))
  stack.addSpacer(5)
}

Script.setWidget(w)
Script.complete()
w.presentSmall()