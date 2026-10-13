# Portfolio — attività in standby

Aggiornato il 13 ottobre 2026. Lavoro locale sul branch `dev`.
Questo elenco raccoglie decisioni rinviate: non autorizza pubblicazione o servizi esterni.

## Experience

- [ ] **View details**: definire insieme i contenuti di approfondimento per ciascuna esperienza (progetti, contributi, risultati e materiali pubblicabili), poi implementare le finestre di dettaglio. Per ora il pulsante non viene mostrato; le responsabilità sono disponibili nelle schede.
- [x] **Loghi forniti**: Polimi Sailing Team, AIRLab, AVR Tech e Lega Navale nelle esperienze; Polimi nella formazione. File spostati dalla root in `public/organizations`, conservati senza modifiche. Per il liceo resta l’icona di formazione; non sono stati forniti loghi Kennedy, KTH o ELIS.
- [ ] **Istruttore di vela — Lega Navale Italiana Ostia**: raccogliere una descrizione delle attività. Ruolo e date sono già presenti; nessuna responsabilità non documentata aggiunta.
- [x] **Competenze AVR**: inseriti i due elenchi completi forniti da Ettore, senza ripetizioni nella stessa scheda; primo elenco per lo stage 2024, secondo per il 2023. Uniformata la grafia Tailwind CSS; mantenute le diciture Node.ts e le voci distinte Angular/AngularJS come fornite.
- [x] **Illustrazioni**: scene approvate dall'utente; rimosse le didascalie interne poco leggibili. Sono rappresentazioni decorative delle attività, non registrazioni né dati reali.

### Riferimento dei contenuti

Fonte della timeline: testo LinkedIn incollato direttamente da Ettore in chat il 13 ottobre 2026. Dati modificabili in `src/experience.ts`.

- Polimi Sailing Team: membro marzo–settembre 2025; responsabile sotto-dipartimento settembre 2025–agosto 2026; co-responsabile da agosto 2026.
- AIRLab, Control Engineer — Robotics Team FRE2026: marzo–luglio 2026.
- AVR Tech, Software Engineer: stage marzo–luglio 2024.
- AVR Tech, Junior Software Developer — Full Stack: stage marzo–luglio 2023.
- Lega Navale Italiana Ostia, istruttore di vela: gennaio 2014–luglio 2023.
- **Social Media Marketing esclusa**, come richiesto.

Le date LinkedIn fornite prevalgono sul riepilogo precedente del CV.
- [ ] Alla prossima revisione del PDF, allineare la progressione del Sailing Team e il termine AIRLab (luglio 2026) alla timeline. Il PDF definitivo ricevuto è conservato senza modifiche.

## Funzionalità rinviate

- [ ] **Globo e visitatori in tempo reale**: globo rimosso dalla pagina su richiesta; eventuale ritorno in standby. Nessun servizio di tracciamento collegato. Prima di attivarlo definire comportamento, backend, dati e informativa.
- [x] **Profilo GitHub**: riquadro con dati pubblici reali e calendario, serviti da una copia locale datata. More e ricerca portano alla sezione. Contatore stelle rimosso. Aggiornamento locale con opzione 7 del menu Docker.
- [ ] **Invio diretto del modulo contatti**: integrazione EmailJS pronta; servono account dell'utente, Service ID, Template ID e Public Key. Configurare template/destinatario e verificare la consegna con un invio concordato. Pulsante disabilitato finché manca la configurazione; nessuna bozza mailto. Guida in `docs/CONTACT_AND_GITHUB_SETUP.md`.
- [ ] **Aggiornamento automatico GitHub**: workflow giornaliero predisposto ma non attivato, collegato alla futura pubblicazione su main. L'utente può abilitare i conteggi anonimi dei contributi privati sul proprio profilo se lo desidera, poi aggiornare la copia locale.
- [ ] **Services**: in standby. Possibili attività indicate dall'utente: siti, web app, ecommerce, gestionali e telemetria. Non ancora mostrate come offerta di servizi.

## Prossime sezioni e pubblicazione

- [x] **Projects, Achievements e News esclusi dalla pagina** per scelta dell'utente. Rimossi anche i relativi collegamenti dal menu e dalla ricerca; Latest mantiene il link al solver. OCP e IELTS non richiedono una sezione separata.
- [ ] Per eventuali approfondimenti delle esperienze o ritorno della sezione progetti, selezionare immagini, collegamenti e materiali di squadra effettivamente pubblicabili. Si intendono foto delle attività, screenshot delle applicazioni o collegamenti ai progetti: sono contenuti facoltativi per i futuri dettagli, distinti dai loghi già ricevuti.
- [ ] Verificare visivamente layout e interazioni su desktop e telefono. Controlli automatici e build non sostituiscono questa revisione.
- [ ] Prima della pubblicazione: rivedere informativa per l'hosting e le funzionalità effettive, link, crediti e disponibilità del sorgente GPL.
- [ ] Attivare la pubblicazione su GitHub Pages quando richiesta: workflow pronto in `.github/workflows/pages.yml`, inattivo senza `ENABLE_PAGES_DEPLOY=true` e branch `main`. Configurare Pages, variabili EmailJS e ambiente. Merge e pubblicazione restano una fase successiva.

## Già completato — non più in standby

- [x] Avatar SVG personale e foto nell'About.
- [x] PDF definitivo: lettura e download locali.
- [x] Inglese predefinito e selettore italiano/inglese.
- [x] About impersonale in entrambe le lingue.
- [x] Prima versione della timeline Experience: cinque schede, sette ruoli, date e attività dal testo fornito.
- [x] Experience: sottotitolo «Where I’ve worked» e illustrazioni senza didascalie interne.
- [x] Education: timeline bilingue con double MSc in corso senza voto, triennale Polimi con formazione ELIS e voto 99, liceo Kennedy con voto 100. Materie e competenze dal CV.
- [x] Skills & Technologies: sei gruppi concordati (Languages; Robotics, Tools & Platforms; Web Development; CS Fundamentals; Soft Skills; Areas of Interest). HTML/CSS nei linguaggi; interesse per sistemi di controllo applicati alla nautica. IT/EN, icone e righe animate nello stile del template; disposizione statica con movimento ridotto.

### Riferimento Education

Triennale settembre 2021–marzo 2025: Ettore ha confermato il 13 ottobre 2026 che la data finale corretta è quella del CV e aggiornerà LinkedIn. Sito allineato; nessuna modifica necessaria al PDF per questa data. Liceo 2016–2021 dal testo fornito dall'utente. MSc da marzo 2025 a oggi e materie dei corsi dal CV. Nessun voto provvisorio per la magistrale.

## Correzioni grafiche del 13 ottobre 2026

- [x] Linea blu della timeline collegata allo scroll, con variante mobile e movimento ridotto.
- [x] Pipeline Moth: SVG fornito, sensori → MQTT/cloud → dashboard.
- [x] Robot: rimosso il movimento accidentale del contenitore; filari curvi e robot con orientamento tangente al percorso.
- [x] Istruttore di vela: scena con istruttore, indicazioni e allievi sulla deriva.
- [x] Illustrazioni AVR conservate come richiesto.
- [ ] Valutare nel browser il risultato in movimento e l'avanzamento della timeline durante lo scroll.
