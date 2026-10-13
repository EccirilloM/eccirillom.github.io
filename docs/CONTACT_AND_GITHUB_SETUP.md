# Invio dal sito e aggiornamento GitHub

Configurazione locale su `dev`, 13 ottobre 2026. Ettore ha creato il servizio Gmail
e il template dal proprio account EmailJS. I tre identificativi pubblici ricevuti
sono configurati in `.env.local`, escluso da Git. Invio dal modulo e consegna in Gmail confermati da Ettore il 13 ottobre 2026.
Reply-To e visualizzazione desktop/telefono confermati da Ettore. Nessuna
pubblicazione eseguita da questa sessione.

## EmailJS: cosa configurare

GitHub Pages ospita il frontend statico. Il browser invia il modulo all'API
EmailJS, che usa il servizio email collegato per consegnare il messaggio.
È lo stesso provider scelto dal template originale, ma occorre un account proprio.

1. Creare un account su https://www.emailjs.com/.
2. In **Email Services**, collegare il proprio servizio di posta e annotare il
   **Service ID**. Il collegamento della casella avviene nel dashboard EmailJS.
3. In **Email Templates**, creare un template con:
   - **To Email** fisso: `ettore.cirillo.dev@gmail.com`.
   - **From Email**: indirizzo del servizio collegato (impostazione predefinita).
   - **From Name**: `Portfolio — {{from_name}}`.
   - **Reply-To**: `{{reply_to}}`.
   - **Subject**: `Nuovo messaggio dal portfolio — {{from_name}}`.
   - **Body**: nome `{{from_name}}`, email `{{reply_to}}`, messaggio `{{message}}`.
   Usare le variabili normali con doppie parentesi, non HTML non filtrato.
   Annotare il **Template ID**. Il destinatario non deve provenire dal modulo.
4. Recuperare la **Public Key** dalle impostazioni account di EmailJS.
5. Copiare `.env.example` in `.env.local` nella root della repo e compilare:

   ```dotenv
   VITE_EMAILJS_SERVICE_ID=il_tuo_service_id
   VITE_EMAILJS_TEMPLATE_ID=il_tuo_template_id
   VITE_EMAILJS_PUBLIC_KEY=la_tua_public_key
   ```

   Questi identificativi sono pubblici nel frontend. Non usare password, token
   GitHub o Private Key EmailJS. `.env.local` è escluso da Git.
6. Nell'allowlist EmailJS, se disponibile nel proprio piano, aggiungere
   `http://localhost:5173`, `http://localhost:4173` e
   `https://eccirillom.github.io` (origin completo, senza percorsi).
7. Riavviare lo sviluppo con le opzioni 5 e 1 del menu `.cmd`, perché Vite legge
   la configurazione all'avvio. Controllare quota del piano e impostazioni antispam
   dell'account. Eseguire un invio concordato per verificare arrivo e Reply-To.

Il sito effettua una richiesta solo dopo il clic su **Invia messaggio**.
Finché manca anche uno degli identificativi, il pulsante è disabilitato e non
viene mostrata una falsa conferma d'invio. Errori preservano il testo inserito.
Un campo esca e un intervallo locale di 30 secondi limitano invii accidentali;
non sostituiscono i controlli antispam del provider. Non è attivato alcun CAPTCHA.
L'informativa IT/EN descrive EmailJS, Gmail e GitHub Pages e distingue modulo
configurato e inattivo. Nel template EmailJS è attiva, come confermato da Ettore, **Do not save private
data**, raccomandato per evitare la conservazione del messaggio nella History;
i metadati e l'email ricevuta in Gmail seguono una conservazione separata.

## GitHub: contributi privati

Il 13 ottobre 2026 la visibilità dei contributi privati risulta attiva sul profilo.
Aggiornamento locale verificato: 760 contributi negli ultimi 365 giorni, coerenti
con il calendario GitHub mostrato da Ettore. Nessun accesso ai repository privati.

Il grafico legge il calendario pubblico, senza accedere ai repository privati.
Sul proprio profilo GitHub, sopra il calendario, aprire **Contribution settings**
e abilitare **Private contributions** se si desidera mostrare conteggi anonimi.
Non rende pubblici codice, nomi dei repository o dettagli delle attività private.
Dopo che GitHub ha aggiornato il profilo, aggiornare i dati con l'opzione 7.
Il calendario non equivale alle ore lavorate: per commit mancanti verificare anche
email associata all'account e branch conteggiati da GitHub.

## Aggiornamento automatico e pubblicazione futura

Configurazione confermata da Ettore: Pages usa già GitHub Actions e le tre variabili EmailJS sono state create. Do not save private data è attivo nel template EmailJS. Restano la variabile ENABLE_PAGES_DEPLOY (valore true), il lavoro aggiornato su main e il primo deploy riuscito. Il nome corretto termina con DEPLOY, non DELPOY.

`.github/workflows/pages.yml` è predisposto ma richiede l'abilitazione esplicita.
Per ora in locale l'opzione 7 aggiorna il file `src/data/github.json`.

Quando sarà il momento di pubblicare:

1. Portare il lavoro approvato su `main`, che deve essere il branch predefinito.
2. In **Settings → Pages**, scegliere **GitHub Actions** come sorgente.
3. In **Settings → Secrets and variables → Actions → Variables**, impostare i tre
   identificativi con **New repository variable** (non Environment variable):

   | Name | Value |
   | --- | --- |
   | `VITE_EMAILJS_SERVICE_ID` | `service_fi2cm6n` |
   | `VITE_EMAILJS_TEMPLATE_ID` | `template_nnr2ep6` |
   | `VITE_EMAILJS_PUBLIC_KEY` | `txnJgGXU9RPIwgG17` |

   Sono valori pubblici destinati al frontend. Non inserire la Private Key.
4. Nella stessa pagina creare **ENABLE_PAGES_DEPLOY** con valore `true`.
5. In **Actions**, avviare il workflow *Portfolio Pages and daily GitHub refresh*
   su `main`. Configurare l'ambiente `github-pages` per consentire solo `main`.

Collegamenti diretti alla repository:
- Pages: https://github.com/EccirilloM/eccirillom.github.io/settings/pages
- Variabili: https://github.com/EccirilloM/eccirillom.github.io/settings/variables/actions
- Permessi Actions: https://github.com/EccirilloM/eccirillom.github.io/settings/actions
- Workflow: https://github.com/EccirilloM/eccirillom.github.io/actions/workflows/pages.yml

Se Actions è disabilitato, abilitarlo per la repository consentendo le azioni
ufficiali `actions/*` utilizzate nel file. Non serve abilitare permessi generali
di scrittura: il workflow assegna `pages: write` e `id-token: write` solo al deploy.
In Pages scegliere **GitHub Actions**, senza aggiungere un secondo workflow Jekyll.
Il file deve esistere su `main` per avvio manuale e pianificazione; `main` deve
essere il branch predefinito. Preparare le impostazioni non esegue il merge.
`ENABLE_PAGES_DEPLOY=true` abilita anche le esecuzioni pianificate: impostarlo
quando il contenuto su main è pronto per andare online.

Dopo il primo run verde, aprire https://eccirillom.github.io e verificare CV,
modulo, privacy, crediti e download sorgente; il test locale già riuscito non
verifica eventuali restrizioni EmailJS sul dominio pubblico. Controllare il
timestamp del calendario per confermare l'aggiornamento nella build pubblicata.

Da quel momento il workflow aggiorna il calendario e ricostruisce il sito ogni
giorno alle **07:17 UTC** (08:17 in inverno, 09:17 in estate a Roma), oltre che
a ogni push su main o avvio manuale. GitHub può ritardare i job pianificati.
Nessun commit automatico: la nuova copia dei dati entra nell'artefatto pubblicato.
Se il recupero dati fallisce, la pubblicazione si interrompe e resta il sito
precedente. Il file locale non cambia in seguito a una pubblicazione remota.

Nei repository pubblici GitHub può disabilitare i workflow pianificati dopo
60 giorni senza attività nella repository: si riattivano dalla scheda Actions.
Togliere la variabile di abilitazione o impostarla a `false` ferma nuove esecuzioni
di build/pubblicazione; non rimuove una versione già online.

## Fonti ufficiali

- [Invio email da frontend](https://www.emailjs.com/docs/tutorial/creating-contact-form/)
- [API utilizzata](https://www.emailjs.com/docs/rest-api/send/)
- [Public Key](https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/)
- [Allowlist](https://www.emailjs.com/docs/faq/can-i-add-my-domain-to-allowlist/)
- [Contributi privati](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/manage-visibility-settings-for-private-contributions-and-achievements)
- [Pubblicazione con Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Pianificazione](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
