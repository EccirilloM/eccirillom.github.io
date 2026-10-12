# Verifica della prima versione

Data: 12 ottobre 2026. Branch: dev. Nessun push, merge o deploy.

## Superati

- Installazione delle dipendenze con pnpm 11.25.0; lockfile salvato.
- TypeScript strict: nessun errore.
- Build Vite di produzione completata, inclusi sourcemap e avvisi licenze.
- Tre test: assenza di API di tracciamento/storage nel codice applicativo,
  assenza di script/font remoti nell'entry HTML, stato visitatori esplicito IT/EN.
- Configurazione Docker Compose validata con `docker compose config --quiet`.
- `git diff --check`.

La build è stata eseguita usando Node 24 e pnpm già inclusi nel runtime di Codex.
Non sono stati installati Node, React o un package manager a livello di sistema.
Le dipendenze del progetto in node_modules e la cache .pnpm-store sono ignorate da Git.

## Non verificati

- Esecuzione dell'immagine Docker e menu Windows da un capo all'altro: motore Linux
  non disponibile; richiesta di avviare Docker Desktop rifiutata.
- Aspetto desktop/mobile, interazioni nel browser e rendering WebGL: l'accesso
  all'anteprima locale tramite browser automation è stato rifiutato dai permessi.
- Profilo LinkedIn: non leggibile; il collegamento viene dal CV.
- Stato corrente delle attività e autorizzazione dei materiali di squadra: da confermare.

L'anteprima Vite è stata avviata per la verifica e poi fermata. Per vedere il sito:
aprire Docker Desktop, avviare portfolio.cmd e scegliere 1. Controllare IT/EN,
filtri progetti, apertura/chiusura modali (anche Escape), menu mobile, animazioni,
globo e link. Il servizio visitatori reali è intenzionalmente non collegato.

Questi controlli non costituiscono una verifica browser dell'assenza di richieste
esterne né una certificazione legale. Prima della pubblicazione restano da
completare la verifica visiva e l'informativa riferita ai servizi effettivi.
