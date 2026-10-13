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

## Aggiornamento: avvio Docker risolto

Il successivo avvio tramite menu ha costruito correttamente l'immagine, ma Vite
non rispondeva alle richieste HTTP e il container risultava unhealthy. La cache
.pnpm-store montata da Windows conteneva 6.155 elementi. Esclusa la cache dal watcher,
limitata la scansione delle dipendenze a index.html e impostato polling a 500 ms.
Dopo il riavvio: container healthy, HTML e moduli React HTTP 200 in circa 38 ms.
Test (3/3), TypeScript e build di produzione passati anche dentro Docker.
Il menu ora attende al massimo 60 secondi per sviluppo e 120 per anteprima,
e mostra stato e ultimi log in caso di errore. La verifica visiva resta da fare.

## 13 ottobre 2026 — navbar e apertura

Aggiornate solo navbar/apertura e ancore alle sezioni esistenti. Aggiunti menu More,
ricerca Ctrl/Cmd+K, selettore IT/EN, logo provvisorio del template e Instagram eccirillo.
Ripristinati font originali (incluse varianti optical-size), pallino verde, pulsanti
e riquadri social. Read CV spiega che il PDF è in aggiornamento; download disabilitato
con etichetta esplicita. Stats è una predisposizione con link GitHub, senza numeri finti.
About e le altre sezioni restano per i passaggi successivi. Globo in standby.

TypeScript, tre test privacy e build di produzione passati dentro Docker.
HTTP 200 per pagina, HeaderHero.tsx, landing.css e main.tsx. Log Vite confermano
HMR e ricaricamento automatico dopo i nuovi font/dipendenze. Verifica visiva e
interazioni nel browser non eseguite in questo passaggio.

## 13 ottobre 2026 — avatar e About

Integrato avatar Avataaars SVG locale con licenza MIT. Ricostruita About sul layout
del template: avatar e orbita, quattro highlight dal CV, fascia di quattro fatti,
IT/EN e griglia a una colonna sotto 800 px. PDF ancora in attesa della versione
pubblica definitiva dell'utente. Latest resta un link statico alla repo portfolio.
Ripristinata pulsazione verde a 2 secondi; la preferenza del sistema sulle animazioni
viene rispettata inizialmente e il pulsante del sito può modificarla esplicitamente.

Tre test privacy, TypeScript e build passati nel container Docker.
HTTP 200 per pagina, avatar.svg, About.tsx e about.css. SVG XML valido, senza script
né riferimenti esterni. Verifica visiva e delle interazioni in browser non eseguita.

## 13 ottobre 2026 — CV definitivo e correzioni richieste

Inglese iniziale, selettore IT/EN conservato. PDF definitivo copiato in public/cv
senza modifiche (hash identico), Read CV in nuova scheda e Download PDF attivi;
anche la ricerca Ctrl+K collega il PDF. PDF A4 di una pagina renderizzato e letto.
Latest collega NSBSolver, URL e titolo verificati sul repository GitHub pubblico.
Foto precedente ripristinata in About, avatar conservato in navbar e hero.
Nove icone in orbita e quattordici nei lati, incluse ROS 2, GitHub Actions e MQTT.
Le icone laterali scorrono in una fascia fissa su viewport almeno 1280x640;
le viste più piccole mantengono le decorazioni compatte nella hero.

Sei test, TypeScript e build Docker passati. Test geometrici coprono il riciclo,
i limiti della fascia, la distanza fra icone e la dissolvenza prima del footer.
HTTP 200 per pagina, CV (application/pdf), foto, Gazebo e componenti aggiornati.
Il PDF scaricato via HTTP ha lo stesso hash del file fornito dall'utente.
Gazebo SVG valido, privo di riferimenti esterni o contenuto attivo; licenza inclusa.
Verifica visiva e interazioni del sito in browser non eseguite in questo passaggio.
