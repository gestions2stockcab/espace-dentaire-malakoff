/* Mesure des clics vers Doctolib et sur le téléphone (événements GoatCounter, sans cookie). */
(function(){
  function where(a){
    if(a.closest('header'))return 'en-tete';
    if(a.closest('footer'))return 'pied-de-page';
    if(a.closest('.bot'))return 'assistant';
    var s=a.closest('section[id],div[id^="view-"],.hero,.band,aside');
    if(s&&s.classList.contains('hero'))return 'haut-de-page';
    if(s&&s.classList.contains('band'))return 'grande-photo';
    if(s&&s.tagName==='ASIDE')return 'encart-page';
    if(s&&s.id)return s.id.replace(/^view-/,'');
    return 'autre';
  }
  function page(){var p=location.pathname.replace(/\/$/,'')||'/accueil';return p.replace(/^\//,'');}
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
    var h=a.getAttribute('href'),kind=null;
    if(h.indexOf('doctolib.fr')>-1)kind='rdv-doctolib';else if(h.indexOf('tel:')===0)kind='appel-telephone';
    if(!kind||!window.goatcounter||!window.goatcounter.count)return;
    window.goatcounter.count({path:kind==='rdv-doctolib'?'Clic Doctolib':'Clic téléphone',title:kind==='rdv-doctolib'?'Clic vers Doctolib':'Clic sur le numéro',event:true});
  },true);
})();

/* Malakoff : un événement par motif Doctolib (en plus de « Clic Doctolib ») */
(function(){
  var M={'14724502':'RDV orthodontie enfant','14724487':'RDV orthodontie adulte','15912191':'RDV 1er parodontie','15912190':'RDV urgence parodontie',
         '3140869':'RDV urgence dentaire','3140867':'RDV 1re consultation','3140870':'RDV contrôle / détartrage'};
  function nom(h){var m=h.match(/motiveIds(?:%5B%5D|\[\])=(\d+)/);if(m&&M[m[1]])return M[m[1]];
    if(/alicia-soussan/.test(h))return 'RDV 1er implantologie';if(/specialities/.test(h))return 'RDV choix dentiste / orthodontie';if(/specialityId=270/.test(h))return 'RDV orthodontie (liste)';
    if(/specialityId=1\b/.test(h))return 'RDV dentiste (liste)';return 'RDV autre';}
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="doctolib.fr"]');
    if(!a||!window.goatcounter||!window.goatcounter.count)return;var n=nom(a.getAttribute('href'));
    window.goatcounter.count({path:n,title:n,event:true});},true);
})();
/* Malakoff : clics Doctolib / téléphone des visiteurs venus d'une annonce Google (gclid), comptés sans cookie */
(function(){
  var K='mk_pub',v=null,arr=false;try{if(/[?&](gclid|gbraid|wbraid)=/.test(location.search)){v=/rdv-orthodontie/.test(location.pathname)?'ortho':/rdv-parodontie/.test(location.pathname)?'paro':'générale';arr=true;sessionStorage.setItem(K,v)}else v=sessionStorage.getItem(K)}catch(e){}
  if(!v)return;
  function c(n){if(window.goatcounter&&window.goatcounter.count)window.goatcounter.count({path:n,title:n,event:true})}
  if(arr){var t=0,i=setInterval(function(){if(window.goatcounter&&window.goatcounter.count||++t>40){clearInterval(i);c('Pub '+v+' : visite')}},250)}
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'';
    if(/^tel:/.test(h))c('Pub '+v+' : clic téléphone');else if(/doctolib[.]fr/.test(h))c('Pub '+v+' : clic Doctolib');},true);
})();
