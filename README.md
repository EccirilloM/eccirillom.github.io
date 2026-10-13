# Ettore Cirillo — Portfolio

## GitHub e contatti

Il riquadro GitHub usa `src/data/github.json`, una copia datata dei dati pubblici
scaricata direttamente da GitHub (calendario e API repository). Nel menu Windows
scegli **7** per aggiornarla, oppure esegui `pnpm github:update` nel container.
L'aggiornamento richiede rete, non credenziali; in caso di errore mantiene la copia
precedente. Nessuna richiesta a GitHub parte dal browser dei visitatori.
I contributi coprono i 365 giorni indicati; repository e stelle sono i totali
pubblici al momento dell'aggiornamento; le stelle non sono mostrate nella pagina. I linguaggi sono ripartiti per numero
di repository originali pubblici, esclusi i fork, non per byte o padronanza.

Il modulo contatti usa EmailJS, configurato localmente e verificato da Ettore
(consegna e Reply-To). In una nuova installazione resta disabilitato finché non
sono configurati i tre identificativi pubblici in `.env.local`. Invio solo al clic,
nessuna apertura automatica della posta e nessuna conferma prima della risposta
del servizio. Il file vCard
contiene nome, email e profilo GitHub; nessun indirizzo domestico o telefono.
Projects, Achievements, Services, News e globo non sono mostrati. Decisioni in `TODO.md`.

La guida `docs/CONTACT_AND_GITHUB_SETUP.md` descrive EmailJS, contributi privati
e pubblicazione futura. `.github/workflows/pages.yml` aggiorna i dati durante
la build quotidiana e pubblica su Pages, ma soltanto dopo l'abilitazione esplicita
`ENABLE_PAGES_DEPLOY=true` e su `main`. Nessun workflow è stato attivato da questa sessione.

Base bilingue IT/EN, React + TypeScript + Vite. Lavoro locale sul branch `dev`.
Derivato selettivo da portfolio-react di Sagar Gupta (GPL-3.0): sfondo animato,
palette e tipografia; sezioni e componenti personalizzati sui contenuti del CV.

## Avvio su Windows (serve solo Docker Desktop)

1. Avvia Docker Desktop con motore Linux e attendi che sia pronto.
2. Fai doppio clic su **portfolio.cmd**.
3. Premi **1**. Il primo avvio scarica l'immagine Node e le dipendenze.

Menu: **1** sviluppo con aggiornamenti automatici; **2** anteprima produzione;
**3** TypeScript, test e build; **4** log; **5** stop; **6** riallineamento dipendenze;
**0** esce dal menu lasciando eventualmente il sito in esecuzione.

- Sviluppo: http://localhost:5173
- Produzione locale: http://localhost:4173
- Le porte sono esposte solo su loopback, non sulla rete locale.
- Nessuna installazione Node/React richiesta su Windows.
- Dopo modifiche al lockfile, usa 6 prima di 1/2/3: il volume dipendenze persiste.

Comandi equivalenti:

```sh
docker compose up -d --build --wait web
docker compose run --rm web sh -c "pnpm check && pnpm test && pnpm build"
docker compose --profile preview up -d --build --wait preview
docker compose --profile preview down
```

## Dove modificare

- `src/content.ts`: testi IT/EN, link, esperienze, progetti e competenze.
- `src/App.tsx`: sezioni, filtri e finestre di dettaglio.
- `src/experience.ts`: esperienze IT/EN, date e progressione dei ruoli dal testo LinkedIn fornito.
- `src/components/Experience.tsx` e `ExperienceScene.tsx`: timeline e illustrazioni animate.
- `TODO.md`: funzioni e contenuti lasciati in standby.
- `src/style.css`: stile e layout responsive.
- `src/components/Globe.tsx`: globo originale (COBE MIT, asset incluso nel bundle).
- `src/components/AmbientBackground.tsx`: componente adattato da portfolio-react.
- `public/ettore.jpg`: foto usata nella sezione About.
- `public/cv/Ettore_Cirillo_CV.pdf`: PDF definitivo, usato per lettura e download.
- `src/components/SkillIcons.tsx`: icone laterali e icone in orbita.
- `src/components/StackBackdrop.tsx`: movimento delle icone durante lo scorrimento.

La lingua iniziale è inglese; il selettore permette di passare in italiano. Preferenze lingua e movimento solo in memoria:
nessun cookie, storage persistente, analytics o geolocalizzazione. Font locali.
L'unica API contattata dal sito è EmailJS, esclusivamente all'invio del modulo.
L'impostazione di riduzione movimento del sistema è rispettata.

## Globo e visitatori

Il globo è stato rimosso dalla pagina su richiesta dell'utente. Il componente è
conservato per eventuali sviluppi futuri, ma non viene caricato dall'applicazione.
Visitatori in tempo reale e relativo servizio restano in standby.
Vedi `docs/PRIVACY_AND_LICENSES.md` per le decisioni necessarie.

## Pubblicazione futura

Nessun push, merge o deploy è eseguito dal menu. Il workflow Pages è predisposto
ma inattivo senza opt-in. La guida di configurazione spiega come abilitarlo quando
il lavoro sarà approvato su `main`. `base: '/'` è adatto a eccirillom.github.io.

Informativa IT/EN aggiornata per GitHub Pages, EmailJS e Gmail, accessibile dal
footer e dal modulo. Dettagli e limiti della verifica in `docs/PRIVACY_AND_LICENSES.md`.
Prima della pubblicazione completare le impostazioni della guida e, dopo il
deploy, controllare sul dominio pubblico modulo, PDF, informativa e download.
LICENSE.txt, THIRD_PARTY_NOTICES.txt, font-licenses.txt e dependency-licenses.txt sono
inclusi nella build. I primi due sono disponibili anche in sviluppo. `source.tar.gz`
contiene i sorgenti corrispondenti a quella build, inclusi asset, snapshot GitHub,
lockfile e istruzioni; esclude `.env.local`, cronologia Git, dipendenze e cache.
La creazione dell'archivio richiede `tar`, già disponibile nell'immagine Docker
e nei runner Linux di GitHub Actions.

Il footer riprende struttura e stile del template: avatar, firma, colonne di link,
social, copia email su desktop, slider verso il modulo su mobile e orologio Roma.
Codice in `src/components/Footer.tsx`, stile in `src/footer.css`, informativa in
`src/components/PrivacyNotice.tsx`.

## Contenuti da completare

Le attività in corso (magistrale e Sailing Team) sono state confermate dall’utente.
Il PDF definitivo fornito il 13 ottobre 2026 è disponibile per lettura e download.
Il documento originale viene conservato nella root; per aggiornare il sito sostituire
la copia in public/cv/Ettore_Cirillo_CV.pdf. Latest punta al progetto NSBSolver,
configurato in src/content.ts; non vengono fatte chiamate GitHub dal browser.

## Licenza

Codice applicativo GPL-3.0-only. Vedi LICENSE e THIRD_PARTY_NOTICES.md.
Le licenze software non concedono diritti su foto, marchi e dati personali.
