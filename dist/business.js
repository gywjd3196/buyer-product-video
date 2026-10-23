import {t} from './i18n.js?v=d019b041e7';

const footer=document.querySelector('#biz');
const toggle=footer.querySelector('#bizToggle');
const body=footer.querySelector('#bizBody');
const email=footer.querySelector('#bizMail');
const copy=footer.querySelector('#bizMailCopy');
const status=footer.querySelector('#bizMailDone');
let copyTimer;

export function updateBusinessLanguage(){
 footer.querySelectorAll('[data-i18n]').forEach(element=>{element.textContent=t(element.dataset.i18n);});
 footer.querySelectorAll('[data-i18n-aria]').forEach(element=>{element.setAttribute('aria-label',t(element.dataset.i18nAria));});
 copy.title=t('이메일 복사');
 status.textContent='';copy.classList.remove('copied');clearTimeout(copyTimer);
}

toggle.addEventListener('click',()=>{
 const closed=footer.classList.toggle('closed');
 body.inert=closed;
 toggle.setAttribute('aria-expanded',String(!closed));
});

copy.addEventListener('click',async()=>{
 const value=email.textContent.trim();let copied=false;
 try{await navigator.clipboard.writeText(value);copied=true;}
 catch{
  const area=Object.assign(document.createElement('textarea'),{value,readOnly:true});
  area.style.cssText='position:fixed;top:0;left:0;opacity:0;font-size:16px';
  document.body.append(area);area.select();area.setSelectionRange(0,value.length);
  try{copied=document.execCommand('copy');}catch{}
  area.remove();copy.focus({preventScroll:true});
 }
 if(!copied){getSelection()?.selectAllChildren(email);status.textContent=t('이메일 주소를 선택했습니다. 복사해 주세요.');return;}
 copy.classList.add('copied');status.textContent=t('복사됨');
 clearTimeout(copyTimer);
 copyTimer=setTimeout(()=>{copy.classList.remove('copied');status.textContent='';},1600);
});
