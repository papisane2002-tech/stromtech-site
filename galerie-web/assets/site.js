
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
document.querySelectorAll('.demo-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const vals=[...form.querySelectorAll('input,select,textarea')].map(x=>x.value);const subject=encodeURIComponent('Demande depuis le modèle de démonstration');const body=encodeURIComponent(vals.join('\n'));const status=form.querySelector('.form-status');if(status)status.textContent="Démonstration : le formulaire est prêt. L'adresse e-mail devra être configurée pour le client."; }));

// Détecte le slug du modèle depuis le chemin de la page (accueil et pages internes).
(()=>{const parts=location.pathname.split('/').filter(Boolean);const marker=parts.indexOf('modeles');const slug=marker>=0?parts[marker+1]:parts.find(x=>/^(architecture|boutique|restaurant|entreprise|education|portfolio)-[1-4]$/.test(x));if(slug)document.body.dataset.model=slug;})();
