/* Stromtech — interactions partagées des modèles de démonstration.
   Les pages HTML possèdent chacune leur propre composition et leur propre contenu.
   Ce fichier ajoute uniquement les interactions : il ne remplace jamais le HTML. */
(() => {
  'use strict';

  // Navigation mobile : prise en charge des deux variantes de menu présentes.
  document.querySelectorAll('.menu, .menubtn, .menu-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const header = button.closest('header') || document;
      const nav = header.querySelector('.nav, nav');
      if (!nav) return;
      const isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Les formulaires des modèles sont des démonstrations : aucune donnée n'est envoyée.
  document.querySelectorAll('form.demo-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status, [aria-live="polite"]');
      if (status) {
        status.textContent = 'Merci ! Ce formulaire est une démonstration. Les coordonnées ne sont pas envoyées.';
      }
      form.reset();
    });
  });

  // Année automatique pour les éventuels pieds de page dynamiques.
  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
