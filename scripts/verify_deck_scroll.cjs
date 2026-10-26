// Run against an open desktop preview: node scripts/verify_deck_scroll.cjs <Orca page ID>
// Exercises the real page's input handlers and scroll positions, without dependencies.
const {execFileSync}=require('node:child_process');
const page=process.argv[2];
if(!page)throw new Error('Pass the Orca browser page ID for the 4181 preview.');
const expression=`(async()=>{
 const deck=document.getElementById('deck'),pager=window.PYDERIN_PAGER;
 if(!pager||deck.clientWidth<1000)throw new Error('Open the desktop deck preview first.');
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms)),results=[];
 const origin=document.getElementById('s2');
 const top=element=>deck.scrollTop+element.getBoundingClientRect().top-deck.getBoundingClientRect().top;
 const first=top(origin),second=top(document.querySelector('[data-opening-panel="science"]')),third=top(document.getElementById('s3'));
 const wheel=(dy,target=deck,options={})=>{const e=new WheelEvent('wheel',{deltaY:dy,bubbles:true,cancelable:true,...options});target.dispatchEvent(e);return e};
 const reset=async()=>{pager.navigate(origin,true);await wait(200)};
 const check=(name,expected)=>{const actual=deck.scrollTop;results.push({name,pass:Math.abs(actual-expected)<3,actual,expected})};
 await reset();wheel(16);await wait(550);check('small wheel input',second);
 await reset();for(let n=0;n<60;n++){wheel(90*Math.pow(.91,n));await wait(20)}await wait(550);check('one screen for a decaying trackpad swipe',second);
 await reset();for(let n=0;n<60;n++){wheel(100-n*.5);await wait(20)}await wait(550);check('slowly fading momentum does not advance again',second);
 await reset();for(const dy of [80,50,30,15,7,3]){wheel(dy);await wait(35)}for(const dy of [20,40,30,15,5]){wheel(dy);await wait(35)}await wait(1100);check('new swipe during the momentum tail',third);
 await reset();wheel(80);await wait(170);wheel(80);await wait(1100);check('fresh input during animation is retained',third);
 await reset();for(const dy of [80,60,40,25,15,8,5]){wheel(dy);await wait(90)}wheel(-80);await wait(550);check('reverse without a pause',first);
 await reset();for(let n=0;n<20;n++){wheel(100);await wait(100)}await wait(550);results.push({name:'repeated mouse wheel does not lock',pass:deck.scrollTop>third,actual:deck.scrollTop});
 await reset();wheel(80,document.getElementById('topFrame'));await wait(550);check('wheel over fixed header',second);
 await reset();const select=document.getElementById('languageSelect');const formEvent=wheel(80,select);await wait(550);check('language control keeps native input',first);results.push({name:'language control event is not cancelled',pass:!formEvent.defaultPrevented});
 await reset();const horizontal=wheel(5,deck,{deltaX:80});const zoom=wheel(80,deck,{ctrlKey:true});await wait(550);check('horizontal scrolling and pinch zoom are preserved',first);results.push({name:'native gestures are not cancelled',pass:!horizontal.defaultPrevented&&!zoom.defaultPrevented});
 pager.navigate(origin,true);
 return results;
})()`;
const response=JSON.parse(execFileSync('orca',['eval','--page',page,'--expression',expression,'--json'],{encoding:'utf8',timeout:30000}));
if(!response.ok)throw new Error(JSON.stringify(response.error));
const results=JSON.parse(response.result.result);
for(const result of results)console.log(`${result.pass?'PASS':'FAIL'} ${result.name}${result.actual===undefined?'':` (${result.actual})`}`);
if(results.some(result=>!result.pass))process.exitCode=1;
