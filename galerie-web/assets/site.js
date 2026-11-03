
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
document.querySelectorAll('.demo-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const vals=[...form.querySelectorAll('input,select,textarea')].map(x=>x.value);const subject=encodeURIComponent('Demande depuis le modèle de démonstration');const body=encodeURIComponent(vals.join('\n'));const status=form.querySelector('.form-status');if(status)status.textContent="Démonstration : le formulaire est prêt. L'adresse e-mail devra être configurée pour le client."; }));

// Identifie le modèle depuis son dossier pour appliquer sa composition dédiée.
(()=>{const m=location.pathname.match(/\/modeles\/([^/]+)\//);if(m)document.body.dataset.model=m[1];})();
