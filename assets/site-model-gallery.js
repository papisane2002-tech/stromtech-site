(function(){
"use strict";
var catalog={
 vitrine:{title:"Site vitrine",pages:[["Accueil","photo-1497366754035-f200968a6e72"],["Services","photo-1521737711867-e3b97375f902"],["Réalisations","photo-1497366811353-6870744d04b2"],["À propos","photo-1521737711867-e3b97375f902"],["Contact","photo-1497366216548-37526070297c"]]},
 portfolio:{title:"Portfolio créatif",pages:[["Accueil","photo-1498050108023-c5249f4df085"],["Projets","photo-1507238691740-187a5b1d37b8"],["Projet détaillé","photo-1519389950473-47ba0277781c"],["À propos","photo-1521737711867-e3b97375f902"],["Contact","photo-1497366216548-37526070297c"]]},
 boutique:{title:"Boutique en ligne",pages:[["Accueil","photo-1441986300917-64674bd600d8"],["Catalogue","photo-1490481651871-ab68de25d43d"],["Fiche produit","photo-1542291026-7eec264c27ff"],["Panier","photo-1472851294608-062f824d29cc"],["Contact","photo-1497366216548-37526070297c"]]},
 landing:{title:"Page de conversion",pages:[["Accueil","photo-1460925895917-afdab827c52f"],["Offre","photo-1552664730-d307ca884978"],["Avantages","photo-1521737711867-e3b97375f902"],["Tarifs","photo-1554224155-6726b3ff858f"],["Contact","photo-1497366216548-37526070297c"]]},
 evenement:{title:"Site événementiel",pages:[["Accueil","photo-1492684223066-81342ee5ff30"],["Programme","photo-1506157786151-b8491531f063"],["Galerie","photo-1501386761578-eac5c94b800a"],["Billetterie","photo-1505373877841-8d25f7d46678"],["Contact","photo-1497366216548-37526070297c"]]}
};
var labels={vitrine:"Vitrine",portfolio:"Portfolio",boutique:"Boutique",landing:"Page de conversion",evenement:"Événement"};
var style=document.createElement("style");
style.textContent='.web-model-preview{display:block;margin-top:10px;width:100%;border:1px solid #d8def0;background:#f6f8fc;color:#273653;border-radius:10px;padding:9px 12px;font:700 .78rem Figtree,sans-serif;cursor:pointer}.web-model-preview:hover{border-color:#2340ff;color:#2340ff}.wm-overlay{position:fixed;inset:0;z-index:9999;background:#07101dcc;display:grid;place-items:center;padding:18px}.wm-dialog{width:min(1120px,100%);max-height:94vh;overflow:auto;background:#fff;color:#182033;border-radius:20px;box-shadow:0 25px 90px #0007}.wm-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:18px 22px;border-bottom:1px solid #e5e9f2}.wm-head h2{margin:0;font-size:1.2rem}.wm-close{border:0;background:#edf0f7;border-radius:10px;padding:9px 12px;font-weight:800;cursor:pointer}.wm-layout{display:grid;grid-template-columns:minmax(0,1fr) 190px;gap:18px;padding:18px}.wm-screen{min-width:0;border:1px solid #dfe4ee;border-radius:14px;overflow:hidden;background:#f5f7fb}.wm-screen img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover}.wm-caption{padding:13px 16px;font-weight:800}.wm-thumbs{display:grid;gap:9px;align-content:start}.wm-thumb{display:flex;gap:8px;align-items:center;text-align:left;border:1px solid #e1e6f0;background:#fff;border-radius:10px;padding:7px;cursor:pointer;font:700 .76rem Figtree,sans-serif;color:#26314c}.wm-thumb[aria-pressed=true]{border:2px solid #2340ff;background:#f1f3ff}.wm-thumb img{width:62px;height:44px;object-fit:cover;border-radius:6px}.wm-actions{display:flex;justify-content:flex-end;gap:10px;padding:0 18px 18px}.wm-use{border:0;background:#2340ff;color:#fff;border-radius:10px;padding:12px 18px;font-weight:800;cursor:pointer}.wm-note{padding:0 18px 16px;color:#667085;font-size:.8rem}@media(max-width:650px){.wm-layout{grid-template-columns:1fr}.wm-thumbs{grid-template-columns:repeat(2,minmax(0,1fr))}.wm-thumb{font-size:.7rem}.wm-screen img{aspect-ratio:4/3}.wm-head{padding:14px}.wm-dialog{max-height:96vh}}';
document.head.appendChild(style);
function photo(id,w){return "https://images.unsplash.com/"+id+"?auto=format&fit=crop&w="+(w||1400)+"&q=85";}
function findTemplateKey(card){var cls=Array.from(card.querySelector(".tpl-preview")?.classList||[]).find(function(x){return x.indexOf("tpl-preview-")===0;});return cls?cls.replace("tpl-preview-",""):"";}
function open(key,card){
 var data=catalog[key];if(!data)return;
 var overlay=document.createElement("div");overlay.className="wm-overlay";
 var dialog=document.createElement("section");dialog.className="wm-dialog";dialog.setAttribute("role","dialog");dialog.setAttribute("aria-modal","true");dialog.setAttribute("aria-label","Aperçu des pages du modèle "+data.title);
 var current=0;
 var head=document.createElement("header");head.className="wm-head";
 var h=document.createElement("h2");h.textContent="Explorer le modèle · "+data.title;
 var close=document.createElement("button");close.className="wm-close";close.type="button";close.textContent="Fermer";close.addEventListener("click",function(){overlay.remove();});
 head.append(h,close);
 var layout=document.createElement("div");layout.className="wm-layout";
 var screen=document.createElement("div");screen.className="wm-screen";
 var image=document.createElement("img");image.alt="Aperçu de la page "+data.pages[0][0];image.src=photo(data.pages[0][1]);
 var caption=document.createElement("div");caption.className="wm-caption";caption.textContent="Page 1 · "+data.pages[0][0];screen.append(image,caption);
 var thumbs=document.createElement("nav");thumbs.className="wm-thumbs";thumbs.setAttribute("aria-label","Pages du modèle");
 function select(i){current=i;image.src=photo(data.pages[i][1]);image.alt="Aperçu de la page "+data.pages[i][0];caption.textContent="Page "+(i+1)+" · "+data.pages[i][0];Array.from(thumbs.children).forEach(function(b,n){b.setAttribute("aria-pressed",String(n===i));});}
 data.pages.forEach(function(p,i){var b=document.createElement("button");b.type="button";b.className="wm-thumb";b.setAttribute("aria-pressed",String(i===0));var im=document.createElement("img");im.src=photo(p[1],220);im.alt="";var span=document.createElement("span");span.textContent=(i+1)+". "+p[0];b.append(im,span);b.addEventListener("click",function(){select(i);});thumbs.appendChild(b);});
 layout.append(screen,thumbs);
 var note=document.createElement("p");note.className="wm-note";note.textContent="Aperçus visuels des différentes pages. Le contenu et les textes seront personnalisables dans le Studio.";
 var actions=document.createElement("div");actions.className="wm-actions";
 var use=document.createElement("button");use.type="button";use.className="wm-use";use.textContent="Utiliser ce modèle";
 use.addEventListener("click",function(){overlay.remove();var target=card.querySelector(".tpl");if(target)target.click();});
 actions.appendChild(use);dialog.append(head,layout,note,actions);overlay.appendChild(dialog);document.body.appendChild(overlay);
 overlay.addEventListener("click",function(e){if(e.target===overlay)overlay.remove();});
 document.addEventListener("keydown",function esc(e){if(e.key==="Escape"&&document.body.contains(overlay)){overlay.remove();document.removeEventListener("keydown",esc);}});
 close.focus();
}
function enhance(){
 var host=document.getElementById("tplList");if(!host||document.body.getAttribute("data-studio-service")!=="site")return;
 Array.from(host.querySelectorAll(".tpl")).forEach(function(card){if(card.dataset.webPreviewReady)return;var key=findTemplateKey(card);if(!catalog[key])return;card.dataset.webPreviewReady="1";var b=document.createElement("button");b.type="button";b.className="web-model-preview";b.textContent="Voir les "+catalog[key].pages.length+" pages du modèle";b.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();open(key,card);});card.appendChild(b);});
}
var root=document.getElementById("tplList");if(root)new MutationObserver(enhance).observe(root,{childList:true,subtree:true});
document.addEventListener("click",function(e){if(e.target.closest('[data-studio-service="site"]'))setTimeout(enhance,80);});
setInterval(enhance,500);
})();