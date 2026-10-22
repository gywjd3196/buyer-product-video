import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {selectPosts,verified} from '../dist/ranking.js';
const data=JSON.parse(readFileSync(new URL('../dist/catalog.json',import.meta.url),'utf8'));
assert.equal(new Set(data.posts.map(p=>p.id)).size,data.posts.length,'Duplicate posts');
const ids=new Set(data.products.map(p=>p.id));
for(const p of data.products) assert(existsSync(new URL('../dist/'+p.image,import.meta.url)));
for(const p of data.posts){
 assert(['일본','대만'].includes(p.country));
 assert.match(p.url,/^https:\/\/www\.instagram\.com\/p\/[\w-]+\/$/);
 assert(p.productIds.every(id=>ids.has(id)));
 const allowed=['id','url','creator','country','productIds','productLabel','views','viewsCheckedAt','metricSource','mediaType','sources','viewsApproximate','viewsDisplay','videoSrc','poster','metricBasis','unavailable'];
 assert(Object.keys(p).every(k=>allowed.includes(k)), 'Unexpected public data field');
 if(p.views!==null) assert(verified(p), 'Recorded views must have provenance');
 for(const key of ['videoSrc','poster']) if(p[key]) assert.match(p[key],/^https:\/\/pyderin-(japan|taiwan)-reels-showcase\.tambeautyofficial\.chatgpt\.site\/assets\/[\w.-]+$/);
}
const base={country:'일본',productIds:['reju-cream'],mediaType:'video',viewsCheckedAt:'2026-10-21',metricSource:'https://www.instagram.com/p/test/'};
const posts=[{...base,id:'a',views:100},{...base,id:'b',views:200},{...base,id:'c',views:0},{...base,id:'d',views:null},{...base,id:'e',views:500,mediaType:'unverified'},{...base,id:'f',views:600,country:'대만'},{...base,id:'g',views:700,productIds:['hydro-serum']},{...base,id:'h',views:999,metricSource:null}];
assert(!verified(posts[3]));assert(!verified(posts[4]));assert(!verified(posts[7]));assert(verified(posts[2]));
const selection=selectPosts(posts,{country:'일본',productId:'reju-cream',limit:3});
assert.deepEqual(selection.ranked.map(p=>p.id),['b','a','c']);assert.equal(selection.complete,false);
assert.deepEqual(selectPosts(posts,{country:'대만',limit:5}).ranked.map(p=>p.id),['f']);
assert.equal(selectPosts([{...base,id:'z',views:null}],{limit:3}).ranked.length,0);
assert.equal(selectPosts(posts.slice(0,3),{limit:3}).complete,true);
assert.equal(selection.selected.length,3,'Product limit must include both ranked and reference posts');
assert.equal(selection.references.length,0);
assert.equal(selectPosts([{...base,id:'hidden',views:900,unavailable:true}],{limit:3}).selected.length,0);
for(const product of data.products) for(const country of [undefined,'일본','대만']) {
 const result=selectPosts(data.posts,{productId:product.id,country,limit:3});
 assert(result.selected.length<=3);
 assert(result.selected.every(p=>p.productIds.includes(product.id)&&(!country||p.country===country)));
 assert(result.ranked.every((p,i)=>i===0||result.ranked[i-1].views>=p.views));
}
assert.deepEqual(data.markets.map(m=>m.code),['JP','TW']);
assert(data.markets.every(m=>/^https:\/\//.test(m.url)));
console.log(`PASS: ${data.products.length} products, ${data.posts.length} unique posts; ranking, missing metrics, country/product filters, data allowlist and assets verified.`);
