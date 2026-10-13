# Privacy, crediti e licenze — revisione del 13 ottobre 2026

Verifica del codice, degli asset e della documentazione dei fornitori. Le impostazioni
degli account e il sito online richiedono una verifica nella dashboard e dopo il deploy:
non si possono certificare da una build locale.

## Informativa attuale

`src/components/PrivacyNotice.tsx` contiene l'informativa IT/EN, accessibile sia dal
footer sia accanto al pulsante di invio del modulo. Descrive:

- Titolare Ettore Cirillo, contatto ettore.cirillo.dev@gmail.com.
- Dati del modulo: nome, email, messaggio; richiesta effettuata solo all'invio.
- Finalità di risposta e gestione della corrispondenza; misure precontrattuali
  per le pertinenti richieste professionali e legittimo interesse per le altre.
- EmailJS per consegna, Google/Gmail per casella; metadati tecnici dei fornitori.
- GitHub Pages per hosting pubblico e relativi log IP di sicurezza.
- Conservazione per il tempo necessario alla richiesta e all'eventuale rapporto;
  ulteriori esigenze legali o difensive. Questo criterio richiede che il titolare
  elimini effettivamente la corrispondenza non più necessaria: il sito non può
  cancellare autonomamente email, log o backup dei fornitori.
- Trasferimenti extra SEE, garanzie dichiarate dai fornitori e link alle policy.
- Diritti, opposizione, reclamo al Garante; dati non pubblicati dal modulo.

EmailJS dichiara hosting USA e SCC; il DPA pubblicato è parte delle condizioni
secondo i termini di incorporazione indicati dal fornitore. Non abbiamo verificato
contratti o configurazioni privati dell'account. Gmail è la casella personale
collegata, non un contratto Google Workspace che si possa presumere sottoscritto.

Il criterio di conservazione nell'informativa va rispettato nella gestione della
casella. Ettore ha confermato che **Do not save private data** è attivo nel template EmailJS, per non conservare il corpo del messaggio nella History. Non elimina i metadati
tecnici né le email in Gmail. Non dichiariamo quindi «nessun dato conservato».
Reply-To, consegna email e visualizzazione desktop/telefono confermati da Ettore.

## Cookie e richieste di rete

Codice applicativo senza cookie, storage persistente, geolocalizzazione, analytics,
font remoti, embed o CAPTCHA. Preferenze solo in memoria, orologio Europe/Rome
calcolato localmente; la riga Web Vitals misura le prestazioni della visita nel browser, senza registrarle o inviarle; GitHub mostra un file dati incluso nella build. Il globo
non viene caricato. Durante lo sviluppo Vite usa una connessione locale per HMR.
Solo EmailJS riceve la richiesta del modulo, con credentials omit. I normali
link esterni attivano il servizio scelto quando il visitatore li apre.

Con queste funzionalità non è necessario introdurre un banner di consenso per
tracking assente. L'informativa rimane necessaria per i dati del modulo e i log
di hosting; la sola assenza di cookie non elimina gli obblighi sui dati personali.
Nuovi analytics, CAPTCHA, mappe, embed o visitatori richiedono una nuova valutazione.

Fonti consultate il 13 ottobre 2026:
- https://www.garanteprivacy.it/faq/Cookie
- https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876
- https://eur-lex.europa.eu/eli/reg/2016/679/oj (articoli 6, 13 e 15–22)
- https://www.emailjs.com/legal/privacy-policy/
- https://www.emailjs.com/legal/data-protection-agreement/
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection
- https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
- https://policies.google.com/privacy
- https://policies.google.com/privacy/frameworks

## Template principale e sorgente corrispondente

portfolio-react di Sagar Gupta, revisione locale
8b5c341c9a8c3a71f7bc49915222128130316331, GPL versione 3:
https://github.com/Sagargupta16/portfolio-react

GPL consente uso e modifiche. Il JavaScript distribuito al browser richiede
rispetto della licenza, conservazione degli avvisi e disponibilità del sorgente
corrispondente. LICENSE integrale, autore originario e modifiche sono indicati
nei crediti. Anche il footer ora conserva il collegamento all'autore originale.

Ogni build include LICENSE.txt, THIRD_PARTY_NOTICES.txt, dependency-licenses.txt,
font-licenses.txt, AVATAAARS-LICENSE.txt e DEVICON-LICENSE.txt. `scripts/source.mjs`
produce inoltre `dist/source.tar.gz` dagli input della build, inclusa la copia
GitHub aggiornata: codice, asset, lockfile, configurazione, test e istruzioni.
L'archivio non include .env.local, .git, node_modules o cache. I tre identificativi
EmailJS sono configurazione pubblica frontend, non password; si impostano come
descritto nella guida. La Private Key non è necessaria e non va aggiunta.

Il sorgente è scaricabile nel footer e nell'informativa della build di produzione;
rimane anche il link alla repository. Nel preview di sviluppo il link all'archivio
non appare perché è generato dalla build. Per compilare: estrarre l'archivio,
configurare i tre valori pubblici come nella guida, usare Docker e `portfolio.cmd`
opzione 3 oppure Node 24 con pnpm 11.25.0, `pnpm install --frozen-lockfile` e `pnpm build`.

Fonti: https://www.gnu.org/licenses/gpl-3.0.html e
https://www.gnu.org/licenses/gpl-faq.en.html#WMS

## Secondo template e materiali

Shengxiang-Lin.github.io, revisione e863ee318f971fb33088075403875c64380c792c:
nessuna licenza generale trovata. Nessun suo codice, asset o endpoint è usato.
Il suo globo contatta un worker esterno dell'autore; quel backend non fa parte
del checkout e le sue pratiche non sono verificabili. Il globo locale indipendente
COBE (MIT) è conservato nel sorgente ma escluso dalla pagina; visitatori in standby.

Avataaars e Devicon hanno testi MIT locali. I cinque font Fontsource hanno OFL
inclusa nella build. Dipendenze e icone mantengono le rispettive licenze.
La licenza software non concede diritti sui marchi, sui loghi di organizzazioni,
sulla foto personale, sul Moth o sul CV forniti dall'utente. Tali materiali sono
separati dal codice GPL, con provenienza registrata nei crediti; non è una verifica
di autorizzazioni di terzi non fornite. Non sono importati CV, foto o account
EmailJS/analytics dell'autore originale.

Il CV definitivo è servito localmente e non contiene l'indirizzo domestico;
include il telefono scelto dall'utente. Non è stato alterato. Per i futuri
approfondimenti di squadra utilizzare solo materiali pubblicabili.

## Verifiche di pubblicazione ancora dipendenti dall'account

Sorgente, licenze e informativa sono preparati. Prima di considerare concluso il
lancio, verificare Pages/Actions, impostazioni EmailJS e raggiungibilità effettiva
di sito, PDF, informativa, crediti e archivio sorgente sul dominio pubblico.
Non affermare che un deploy sia riuscito prima della conferma di GitHub Actions.

Pages impostato su GitHub Actions e tre variabili EmailJS configurate, confermati da Ettore. Rimane ENABLE_PAGES_DEPLOY e il deploy della versione approvata su main.
