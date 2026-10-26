/* Typography plates and product compositions for scripts/refine_brand_film.py. Requires Playwright. */
const {chromium}=require('playwright');
const path=require('path');
const root=path.resolve(__dirname,'..');
const base=(process.env.PYDERIN_PREVIEW_URL || 'http://127.0.0.1:4181').replace(/\/$/,'')+'/assets/';
const stages=[
 {label:'PDRN / ORIGIN',title:'PDRN<span class="red">.</span>',cls:'opening',copy:'If anyone could have mastered PDRN,<br>PYDERIN would never have existed.',foot:'PYDERIN · SEOUL, KOREA'},
 {label:'01 / PRECISION',title:'Not a single<br>margin of error.',copy:'',foot:'FROM RAW MATERIAL TO FORMULA'},
 {label:'02 / PROCESS',title:'<span class="red">8,760</span>',cls:'number',copy:'hours of<br>patient waiting.',foot:'THE TIME BEHIND THE STANDARD'},
 {label:'03 / RAW MATERIAL',title:'<span class="red">99%</span>',cls:'number',copy:'PDRN raw-material purity.',foot:'DERBIOME® PDRN'},
 {label:'PYDERIN / THE ESSENCE',title:'PDRN, and<br>the essence<br>beyond.',copy:'',foot:'PYDERIN.COM'}
];
const style=`@font-face{font-family:P;src:url('${base}fonts/PretendardVariable.woff2')}*{box-sizing:border-box}html,body{margin:0;width:1920px;height:1080px;background:transparent;overflow:hidden;font-family:P,sans-serif;color:#101114}.mask{position:absolute;inset:0}.logo{position:absolute;left:96px;top:80px;width:210px;height:auto}.body{position:absolute;left:96px;top:280px;width:660px}.label{font-size:18px;letter-spacing:2px;color:#7a8088;margin-bottom:48px}.title{font-size:78px;font-weight:550;line-height:1.12;letter-spacing:-3px}.title.opening{font-size:142px;letter-spacing:-7px}.title.number{font-size:146px;letter-spacing:-8px}.copy{font-size:28px;line-height:1.65;letter-spacing:-.5px;margin-top:32px;color:#747a82;max-width:650px}.number+.copy{font-size:42px;line-height:1.35;color:#101114;margin-top:20px}.red{color:#c41f32}.foot{position:absolute;left:96px;bottom:90px;font-size:16px;letter-spacing:1.8px;color:#949ba3}.rule{position:absolute;left:96px;top:236px;width:40px;height:3px;background:#c41f32}`;
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 for(let i=0;i<stages.length;i++){
  const s=stages[i];const html=`<!doctype html><meta charset="utf-8"><style>${style}</style><svg class="mask" width="1920" height="1080"><defs><mask id="m"><rect width="1920" height="1080" fill="white"/><rect x="840" y="72" width="1008" height="936" rx="18" fill="black"/></mask></defs><rect width="1920" height="1080" fill="white" mask="url(#m)"/></svg><img class="logo" src="${base}pyderin-logo.png"><div class="rule"></div><div class="body"><div class="label">${s.label}</div><div class="title ${s.cls||''}">${s.title}</div><div class="copy">${s.copy}</div></div><div class="foot">${s.foot}</div>`;
  await page.setContent(html);await page.evaluate(()=>document.fonts.ready);await page.locator('.logo').evaluate(e=>e.decode());
  await page.screenshot({path:path.join(root,`pyderin-deck/assets/film/title-${i}.png`),omitBackground:true});
 }
 await page.setViewportSize({width:1008,height:936});
 for(const mode of ['single','range']){
  const art=mode==='single'?`<img class="single" src="${base}products/reju-cream.png">`:`<img class="cream" src="${base}products/reju-cream.png"><img class="serum" src="${base}products/hydro-serum.png"><img class="maskpack" src="${base}products/clear-mask.png">`;
  await page.setContent(`<style>*{box-sizing:border-box}body{margin:0;width:1008px;height:936px;overflow:hidden;background:radial-gradient(ellipse at 10% 5%,#fff,transparent 60%),linear-gradient(140deg,#f8f9fa,#e6edf3)}img{position:absolute;object-fit:contain;height:100%;width:55%;top:0}.single{width:80%;height:100%;left:10%}.cream{left:-7%}.serum{left:24%;z-index:1}.maskpack{left:54%;width:46%;top:5%;height:90%}</style>${art}`);
  await page.locator('img').evaluateAll(els=>Promise.all(els.map(e=>e.decode())));
  await page.screenshot({path:path.join(root,`pyderin-deck/assets/film/product-${mode}.png`)});
 }
 await browser.close();console.log('Rendered five typography plates and two product compositions from existing assets.');
})().catch(e=>{console.error(e);process.exit(1)});
