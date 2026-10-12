# Licenze e privacy — verifica iniziale, 12 ottobre 2026

Verifica tecnica/documentale, non certificazione di conformità o parere legale.
La configurazione attuale è locale; la conformità finale dipende dai trattamenti
effettivi e dai servizi scelti al momento della pubblicazione.

## Template principale

https://github.com/Sagargupta16/portfolio-react
Commit locale: 8b5c341c9a8c3a71f7bc49915222128130316331.
LICENSE, package.json e README indicano GPL versione 3.

Consente uso, modifica e ridistribuzione, anche per un portfolio professionale.
Conservare licenza e avvisi, indicare le modifiche e rispettare GPL per il programma
derivato distribuito. Il JavaScript inviato al browser è distribuito: rendere
disponibile il sorgente corrispondente alla versione pubblicata, con configurazione,
lockfile e istruzioni di build. La repo pubblica dovrà contenere proprio quella
versione, non soltanto un template diverso o una build irricostruibile.

Implementati LICENSE integrale, avvisi, commento sul componente adattato, link al
sorgente/crediti e licenze nella build. Ripresi background e linguaggio visivo senza
identità, progetti, analytics, EmailJS o pipeline dell'autore.

Fonti: https://www.gnu.org/licenses/gpl-faq.en.html#WMS
e https://www.gnu.org/licenses/gpl-3.0.html

## Secondo repository

https://github.com/Shengxiang-Lin/Shengxiang-Lin.github.io
Commit locale: e863ee318f971fb33088075403875c64380c792c.
Nessun LICENSE generale trovato; le licenze in _projects riguardano quei progetti,
non automaticamente il sito o il widget. Nessuna licenza trovata nel JS/HTML del
globo. Essere pubblica su GitHub non autorizza il riuso di una repository.

Il widget invia /visit e legge /stats da un worker dell'autore, usa dati cartografici
da CDN e mostra paese/regione/città/coordinate/lastSeen. Il backend non è nel checkout:
logging, conservazione e anonimizzazione non sono verificabili. Nessuna chiamata
è stata effettuata a quelle API e nessun loro endpoint è incluso qui.

Decisione: implementazione indipendente con COBE (MIT), incluso nel bundle. Nessun
codice o asset copiato dal secondo sito. Per riusarlo in futuro occorre un permesso
adeguato o una licenza applicabile verificabile.

Fonti: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository
e https://github.com/shuding/cobe

## Cookie e rete

Anteprima senza cookie, storage del browser, identificatori persistenti, analytics,
font remoti, embed, CAPTCHA, geolocalizzazione o form server. Le preferenze sono in
memoria. Il globo mostra luoghi del percorso, non presenze reali. Durante lo sviluppo
Vite usa un WebSocket locale per aggiornare il codice, assente dalla build finale.

Con questa configurazione non emerge un trattamento che richieda un banner di
consenso ai cookie. Senza cookie NON significa automaticamente fuori dal GDPR:
IP e dati di connessione possono essere dati personali. Un banner non rende
conforme un trattamento da solo. Analytics non sono automaticamente tecnici solo
perché chiamati "anonimi" o "senza cookie".

Fonti del Garante: https://www.garanteprivacy.it/faq/Cookie
e https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876

## GitHub Pages ed email

GitHub dichiara di registrare IP dei visitatori Pages per sicurezza. L'informativa
pubblica dovrà descrivere hosting e trattamento effettivi, evitando di promettere
che nessun dato viene mai trattato. Titolare proposto: Ettore Cirillo; contatto:
ettore.cirillo.dev@gmail.com. Link social ed email attivano servizi solo al clic.

Per email ricevute: finalità di risposta, base giuridica adatta al contesto (es.
misure precontrattuali o interesse legittimo), provider/destinatari, eventuali
trasferimenti e conservazione vanno confermati. Non inventare termini di retention
o accordi con fornitori non verificati.

Prima di andare online completare informativa art. 13: titolare/contatti, finalità,
basi giuridiche, destinatari, trasferimenti e garanzie ove applicabili, conservazione,
diritti applicabili e reclamo al Garante. La finestra privacy attuale descrive
l'anteprima locale e non sostituisce questo passaggio.

Fonti:
https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
https://eur-lex.europa.eu/eli/reg/2016/679/oj

## Presenze reali: proposta per la fase successiva

Pages non esegue backend. Occorre scegliere un servizio proprio o un fornitore.
Proposta: adesione facoltativa separata; nessuna richiesta prima della scelta;
paese scelto manualmente, senza GPS/città/IP pubblici; dati minimi a scadenza breve;
revoca e cancellazione; aggregati con soglie che limitino la riconoscibilità.
Confermare base giuridica, fornitore/ruolo, log, retention, trasferimenti, sicurezza,
abusi e prova del consenso se usato. Si conterebbero sessioni aderenti, non tutte
le persone sul sito. Nessun servizio di terzi attivato a nome dell'utente.

## CV e materiali

Usate le sezioni incluse in resume.tex senza indirizzo di casa o cellulare.
presentation.tex contiene esempi del template non inclusi nel CV e non è biografia
di Ettore. Nessun template/codice LaTeX redistribuito. Foto fornita da confermare
per uso pubblico. LinkedIn non era leggibile dagli strumenti: link dal CV, senza
attribuire al profilo contenuti non verificati.
