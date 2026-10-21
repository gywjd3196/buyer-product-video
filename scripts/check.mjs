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
 assert.deepEqual(Object.keys(p).sort(),['id','url','creator','country','productIds','productLabel','views','viewsCheckedAt','metricSource','mediaType','sources'].sort());
}
const base={country:'일본',productIds:['reju-cream'],mediaType:'video',viewsCheckedAt:'2026-10-21',metricSource:'https://www.instagram.com/p/test/'};
const posts=[{...base,id:'a',views:100},{...base,id:'b',views:200},{...base,id:'c',views:0},{...base,id:'d',views:null},{...base,id:'e',views:500,mediaType:'unverified'},{...base,id:'f',views:600,country:'대만'},{...base,id:'g',views:700,productIds:['hydro-serum']},{...base,id:'h',views:999,metricSource:null}];
assert(!verified(posts[3]));assert(!verified(posts[4]));assert(!verified(posts[7]));assert(verified(posts[2]));
const selection=selectPosts(posts,{country:'일본',productId:'reju-cream',limit:3});
assert.deepEqual(selection.ranked.map(p=>p.id),['b','a','c']);assert.equal(selection.complete,false);
assert.deepEqual(selectPosts(posts,{country:'대만',limit:5}).ranked.map(p=>p.id),['f']);
assert.equal(selectPosts([{...base,id:'z',views:null}],{limit:3}).ranked.length,0);
assert.equal(selectPosts(posts.slice(0,3),{limit:3}).complete,true);
console.log(`PASS: ${data.products.length} products, ${data.posts.length} unique posts; ranking, missing metrics, country/product filters, data allowlist and assets verified.`);
