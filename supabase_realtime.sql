-- À coller dans Supabase > SQL Editor > Run (une seule fois).
-- Active l'affichage instantané des nouveaux messages.
-- Si tu vois "relation ... is already member of publication", c'est déjà actif : ignore l'erreur.
alter publication supabase_realtime add table public.messages;
