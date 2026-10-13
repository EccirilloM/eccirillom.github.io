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

## 13 ottobre 2026 — About impersonale e Experience

About riscritto in stile impersonale IT/EN. Nuova timeline dopo About, adattata
al template originale: date, località, tipologia di rapporto, ruolo, riepilogo,
progressione interna e responsabilità espandibili. Cinque schede e sette ruoli.
Dati dal testo LinkedIn incollato direttamente dall'utente: Sailing Team con tre
ruoli (co-responsabile da agosto 2026), AIRLab fino a luglio 2026, AVR 2024 e 2023
separati, istruttore Lega Navale Ostia gennaio 2014–luglio 2023. Esclusa l'attività
Social Media Marketing. Nessuna durata relativa memorizzata destinata a invecchiare.

Nuove scene SVG decorative per ciascuna scheda, con animazioni CSS fermate fuori
vista, a scheda browser nascosta o con movimento ridotto. Nessun video, GIF o
servizio esterno. Responsabilità consultabili con elementi details/summary nativi.
View details rinviato e non mostrato. TODO.md raccoglie i punti in standby,
compresi globo visitatori, statistiche GitHub, materiali e sezioni successive.

Sei test e build (TypeScript + Vite) superati in Docker. HTTP 200 per About,
Experience, ExperienceScene, dati esperienza e CSS. Verifica visiva e delle
interazioni nel browser non eseguita in questo passaggio.

## 13 ottobre 2026 — Education e pulizia delle illustrazioni

Rimosse le scritte interne alle cinque scene SVG Experience; forme e animazioni
conservate. Sottotitolo aggiornato a «Where I’ve worked» / «Dove ho lavorato».
Nuova timeline Education bilingue sul layout del template, con adattamento mobile:
MSc Polimi | KTH da marzo 2025 al presente, senza voto e con indicatore In progress;
triennale Polimi con formazione ELIS settembre 2021–settembre 2024, voto 99;
liceo scientifico Kennedy 2016–2021, voto 100. Materie e competenze dal CV.
Date e voti forniti in chat prevalgono sul CV; PDF invariato. Le date del liceo
sono presentate come anni, senza inventare mesi. Crediti GPL aggiornati.

Otto test e build TypeScript/Vite superati nel container Docker.
HTTP 200 per pagina, Education.tsx, education.ts, education.css e ExperienceScene.tsx.
Verifica visiva e delle interazioni nel browser non eseguita in questo passaggio.
## 13 ottobre 2026 — location liceo e targhette dei voti

Aggiunta Roma / Rome al liceo Kennedy su indicazione dell'utente. Targhette
riallineate al template: numeri azzurri da 30 px con cifre animate tramite
NumberFlow, fondo e bordo verdi tenui, padding 4 x 12 px e raggio 10 px.
Su telefono voto sotto il titolo del percorso, allineato a sinistra.
Movimento ridotto: valore finale immediato. Voti mantenuti come 99 e 100;
nessun voto per il percorso in corso. Crediti aggiornati.

TypeScript e build Vite superati in Docker. Build segnala il bundle principale
oltre la soglia indicativa di 500 kB (506 kB, 167 kB gzip); non è un errore.
Verifica visiva nel browser non eseguita. Skills: sola proposta in chat,
implementazione in attesa della scelta dei gruppi da parte dell'utente.

## 13 ottobre 2026 — Skills & Technologies in sei gruppi

Implementati esattamente sei gruppi concordati: Languages (inclusi HTML e CSS),
Robotics, Tools & Platforms, Web Development, CS Fundamentals, Soft Skills,
Areas of Interest. Gli interessi includono sistemi di controllo applicati alla
nautica come voce unica. Tre righe di tecnologie animate con icone e tre gruppi
compatti nello stile del template. Testi IT/EN, elenchi unici per lettori di schermo,
pausa fuori vista/a scheda nascosta/al passaggio del mouse e modalità statica
con tutte le tecnologie su più righe quando il movimento è ridotto.

Otto test esistenti e build TypeScript/Vite superati in Docker; nessun nuovo
pacchetto aggiunto. HTTP 200 per Skills.tsx, skills.ts e skills.css.
Build con avviso dimensione bundle principale: 521 kB, 173 kB gzip.
Verifica visiva nel browser non eseguita. Modifiche locali sul branch dev.

## 13 ottobre 2026 — icone, GitHub e Let's talk

Aggiunte icone Lucide per ogni voce nelle tre Skills complementari.
Tolte sezioni Projects e Achievements e relativi link da navbar e palette.
Services in standby e News esclusa; decisioni documentate in TODO.md.
Il pulsante hero porta al riquadro GitHub; Latest conserva il solver.

Coding Platform Profiles adattato al template con dati pubblici di EccirilloM,
calendario di 365 giorni, contributi del periodo, repository pubblici, stelle
ricevute e linguaggi per numero di repository originali (fork esclusi).
Snapshot aggiornato il 13 ottobre 2026 direttamente da GitHub: 100 contributi,
16 repository pubblici, 0 stelle. Fonte calendario: github.com/users/EccirilloM/
contributions; repository: api.github.com/users/EccirilloM/repos. Nessun servizio
terzo per i contributi. Nessuna richiesta esterna dal browser dei visitatori.
L'opzione 7 del menu e pnpm github:update aggiornano la copia locale; errori o
risposte incomplete preservano i dati precedenti. Testano parsing e intervalli
con anni bisestili, senza inventare zeri per date mancanti.

Contatti nello stile del template: schede email/LinkedIn/Instagram/GitHub,
modulo nome/email/messaggio e vCard con nome, email, GitHub. Il modulo apre una
bozza mailto con dati codificati correttamente; copia testo disponibile come
alternativa. Nessuna email inviata durante le verifiche, nessun servizio di
invio configurato e nessuna conferma di messaggio inviato mostrata dal sito.

Undici test e build TypeScript/Vite superati in Docker. HTTP 200 per pagina,
Skills, GitHubProfile, Contact, dati JSON e vCard. Verifica visiva e interazioni
nel browser non eseguite. Bundle principale 539 kB, 177 kB gzip, con avviso Vite
sulla dimensione. Branch dev, lavoro locale senza commit, push o pubblicazione.

## 13 ottobre 2026 — invio diretto, automazione futura e rimozioni

Rimossi globo dalla pagina/import applicativo e contatore stelle GitHub.
Restano contributi e repository pubblici; nessun valore inventato. Numerazione
contatti aggiornata a 06. Componente globo conservato per eventuali sviluppi.

Modulo contatti convertito a invio diretto EmailJS REST su azione esplicita.
Configurazione tramite tre variabili VITE_EMAILJS, con esempio vuoto e guida.
In assenza di configurazione pulsante disabilitato; nessun invio o apertura mailto.
Validazione, campo esca, blocco invii simultanei, intervallo dopo successo,
richieste senza cookie, timeout, errori che conservano il messaggio e conferma
solo dopo risposta positiva del provider. Informativa distingue modulo attivo
ed inattivo. Nessuna password o private key prevista nel frontend.

Workflow Pages predisposto con refresh dati durante build quotidiana; gate
ENABLE_PAGES_DEPLOY=true e branch main. Nessun commit automatico dei dati,
nessuna attivazione, pubblicazione o modifica di impostazioni remote eseguita.
Guida con configurazione EmailJS, contributi privati e attivazione futura Pages.

14 test e build TypeScript/Vite superati. Nuovi test usano richieste simulate:
parametri ammessi, mancata configurazione, input errato, honeypot, errore HTTP,
limite di frequenza e rete interrotta. Nessuna email reale inviata; verifica
end-to-end in attesa dell'account dell'utente. HTTP 200 per Contact, emailConfig,
emailService e App. Verifica visiva nel browser e workflow remoto non eseguiti.
Bundle 526 kB, 171 kB gzip con avviso Vite sulla dimensione. Git diff --check pulito.

## Loghi forniti e assistenza configurazione — 2026-10-13

Cinque loghi spostati dalla root a public/organizations e verificati con SHA-256
prima/dopo; file immutati. Experience usa i quattro loghi delle organizzazioni,
Education il logo Polimi per MSc e BSc. Sfondo scuro per AIRLab, chiaro per gli
altri, immagini locali con dimensioni riservate e object-fit contain.
14 test e build TypeScript/Vite superati; HTTP 200 per tutti e cinque gli asset;
git diff --check senza errori. Revisione visiva rinviata come richiesto.
Aggiornamento GitHub eseguito: 365 giorni, 100 contributi, 16 repository pubblici.
Aperti profilo GitHub e dashboard EmailJS nel browser. Account EmailJS creato e
accesso completato dall'utente; servizio, template e identificativi non ancora
ricevuti. Nessuna impostazione privata o autorizzazione di account modificata.
Controllo interattivo browser non disponibile: manca lo strumento node_repl.

## Correzione contenuti confermata da Ettore — 2026-10-13

Fine triennale corretta a marzo 2025, conforme al CV e alla conferma in chat.
Competenze AVR completate dai due elenchi, deduplicate in ciascuna esperienza.
TODO aggiornati; compilazione TypeScript e build Vite riuscite.
Configurazione degli account GitHub ed EmailJS ancora non eseguita.
