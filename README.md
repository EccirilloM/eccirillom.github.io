# Ettore Cirillo — Portfolio

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
- `src/style.css`: stile e layout responsive.
- `src/components/Globe.tsx`: globo originale (COBE MIT, asset incluso nel bundle).
- `src/components/AmbientBackground.tsx`: componente adattato da portfolio-react.
- `public/ettore.jpg`: foto ricavata dal CV.

La lingua iniziale segue il browser. Preferenze lingua e movimento solo in memoria:
nessun cookie, storage, API esterna, analytics o geolocalizzazione. Font locali.
L'impostazione di riduzione movimento del sistema è rispettata.

## Globo e visitatori

Il globo ruota ed è trascinabile e controllabile con le frecce della tastiera.
**Il mio percorso** mostra Roma, Milano e Stoccolma dal CV, non visitatori.
**Visitatori** indica esplicitamente servizio non collegato, senza statistiche inventate.
Per presenze reali occorrerà un backend esterno proprio: GitHub Pages serve file statici.
Vedi `docs/PRIVACY_AND_LICENSES.md` per le decisioni necessarie.

## Pubblicazione futura

Nessun push, merge o deploy è eseguito dal menu. Nessun workflow di deploy presente.
Dopo l'approvazione si potrà aggiungere una GitHub Action per compilare `main` con
`pnpm install --frozen-lockfile && pnpm build` e pubblicare `dist` su Pages. `base: '/'` è adatto al sito
personale eccirillom.github.io.

Prima della pubblicazione: confermare contenuti attuali e diritti delle immagini,
finalizzare l'informativa per l'hosting scelto, rendere disponibile il sorgente
corrispondente alla build GPL con istruzioni e lockfile, verificare i link pubblici.
LICENSE.txt, THIRD_PARTY_NOTICES.txt, font-licenses.txt e dependency-licenses.txt sono
inclusi nella build. I primi due sono disponibili anche in sviluppo.

## Contenuti da completare

Le attività in corso riprendono il CV e richiedono conferma. AIRLab conteneva un
commento sulle date da sostituire: mostriamo solo l'anno 2026. Esclusi esempi in
presentation.tex, attività commentate, indirizzo di casa, telefono e metriche non
contestualizzate. Il download CV attende un PDF pronto per il pubblico: nella
cartella fornita ci sono sorgenti LaTeX. Nessun pulsante finto di download.

## Licenza

Codice applicativo GPL-3.0-only. Vedi LICENSE e THIRD_PARTY_NOTICES.md.
Le licenze software non concedono diritti su foto, marchi e dati personali.
