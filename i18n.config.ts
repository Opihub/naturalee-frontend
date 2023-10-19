export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'it',
  globalInjection: true,
  messages: {
    it: {
      edit: 'Modifica',
      quantity: 'Quantità',
      create: 'Crea',
      search: 'Cerca',
      searchMsg: 'Di cosa hai bisogno?',
      filters: {
        label: 'Filtra',
        clear: 'Azzera',
        selected:
          'Nessun filtro selezionato | {count} filtro selezionato | {count} filtri selezionati',
        order: 'Ordina',
        orderBy: 'Ordina per...',
      },
      apply: 'Applica',
      asc: 'Prezzo crescente',
      desc: 'Prezzo decrescente',
      errors: {
        backToHome: 'Torna alla homepage',
        ops: 'Ops!',
        generic: 'È avvenuto un errore inaspettato...',
        pageNotFound:
          'La pagina che stavi cercando non esiste oppure è stata spostata.',
      },
      products: {
        count: '{count} @:products.label',
        label: 'prodotto | prodotti',
        type: 'Tipologia',
        price: 'Prezzo',
        quantity: 'Quantità',
        viewDetails: 'Vai alla scheda prodotto',
        category: 'Categoria',
        tag: 'Tag',
        stock:
          'Non disponibile | Pochi pezzi disponibili | Prodotto disponibile',
        related: 'Potrebbero interessarti anche',
        homepageFeatured: 'Scegli tra la nostra fresca selezione:',
      },
      company: {
        pIva: 'PI {piva}',
        cf: 'CF {cf}',
        rea: 'REA MI {rea}',
        capSoc: 'Cap. Soc. €{capSoc} int.ver',
      },
      cart: {
        your: 'Il tuo carrello',
        add: 'Aggiungi',
        addTo: 'Aggiungi al carrello',
        empty: 'Non hai alcun prodotto nel carrello',
        cleared: 'Il carrello è stato svuotato',
        missingProduct: 'Prodotto non trovato nel carrello',
        quantity: '@:products.quantity / U',
        quantityUpdated: '@:quantity aggiornata | @:quantity aggiornate',
        addedToCart:
          '{count} {name} aggiunto al carrello | {count} {name} aggiunti al carrello',
        removedFromCart:
          '{name} rimosso dal carrello | Prodotti rimossi dal carrello',
        clearCart: 'Svuota carrello',
        productCode: 'Cod. {sku}',
        shippingCost: 'Spese di consegna',
        orderTotal: "Totale dell'ordine",
        fee: 'IVA Inc',
        proceed: "Procedere con l'ordine",
        goToCart: 'Vai al carrello',
        total: 'Totale carrello',
        shippingTo: 'Spedizione a <b>city</b>',
      },
      form: {
        userField: 'Nome utente o indirizzo email',
        mailField: 'Indirizzo email',
        phone: 'Telefono',
        login: 'Accedi',
        signUp: 'Registrati',
        logout: 'Esci',
        remember: 'Ricordami',
        submit: 'Invia',
        submitContact: 'Invia richiesta',
        message: 'Descrivi brevemente la tua richiesta',
        name: 'Nome',
        surname: 'Cognome',
        displayName: 'Nome Visualizzato',
        age: 'Età',
        toEmail: "all'indirizzo email",
        toUserEmail: "all'indirizzo email dell'utente",
        noUserFound:
          'Ci dispiace, ma non abbiamo trovato alcun utente con {field} {userParam}',
        toMailAddress: 'indirizzo email',
        toUser: "l'username",
        consentTo: 'Acconsento al',
        acceptance: 'trattamento dei miei dati personali',
        validEmail: 'Inserisci un indirizzo e-mail valido',
        Notify: 'Notificami',
        errorMessage1: 'Oh, no!',
        errorMessage2:
          'È avvenuto un errore durante il salvataggio… Riprova ad inviare il form',
        errorMessage3: 'Oh, no!',
        returnToLogin: 'Oppure torna al login',
        saveChanges: 'Salva le modifiche',
        displayNameMsg:
          "Questo è il modo in cui il tuo nome verrà visualizzato nella sezione dell'account e nelle recensioni",
        password: {
          field: 'Password',
          forget: 'Hai dimenticato la password?',
          recovery: 'Recupera password',
          recoveryInstruction:
            'Inserisci la tua nuova password qui di seguito oppure generane una.',
          recoveryDisclaimer:
            "Hai perso la password? Inserisci il tuo nome utente o l'indirizzo email. Riceverai tramite email un link per generarne una nuova.",
          recoverySent:
            'Abbiamo inviato una mail {field} {userParam} con il link per recuperare la password.',
          old: 'Password attuale',
          new: 'Nuova password',
          check: 'Conferma nuova password',
          save: 'Salva password',
          update: 'Modifica password',
          generate: 'Genera Password',
        },
        leaveBlank: 'lascia in bianco per non modificare',
        contactUs: 'Contattaci',
        moreInfo:
          'Per maggiori informazioni, per richiedere un preventivo o qualsiasi altra richiesta non esitare a contattarci',
        privacyPolicy: {
          term1:
            "Autorizzo il trattamento dei dati personali in conformità all'informativa sulla",
          term2:
            ', ai sensi del GDPR, General Data Protection Regulation UE 2016/679',
        },
      },
      coupon: {
        name: 'Coupon',
        formTitle: 'Hai un codice sconto?',
        formPlaceholder: 'Codice promozionale',
        asking: 'Hai un codice promozionale?',
        insertHere: 'Fai clic qui per inserire il tuo codice promozionale',
        applied: 'Coupon applicato!',
        notValid: 'Coupon non valido!',
      },
      wishlist: {
        added: '{name} aggiunto ai preferiti',
        removed: '{name} rimosso dai preferiti',
        missingProduct: 'Prodotto non trovato nei preferiti',
        alreadyPresent: '{name} già presente nei preferiti',
        cleared: 'La wishlist è stata svuotata',
        empty: 'Non hai alcun prodotto nella wishlist',
      },
      common: {
        date: 'Data',
        update: 'Aggiorna',
        actions: 'Azioni',
        total: 'Totale',
        subTotal: 'Subtotale',
        loading: 'Caricamento',
        no: 'No',
        yes: 'Sì',
        vatInclude: 'IVA inclusa',
        video: {
          clickHere: 'Clicca qui per visionare il video',
        },
      },
      checkout: {
        payment: 'Pagamento',
        notesPlaceholder:
          "Note sull'ordine, ad esempio richieste particolare per la consegna...",
      },
      orders: {
        your: 'Il tuo ordine',
        shipping: 'Spedizione',
        billing: 'Fatturazione',
        payment: 'Metodo di pagamento',
        name: 'Ordine | Ordini',
        statusLabel: 'Stato',
        status: {
          pending: 'In attesa di pagamento',
          processing: 'In lavorazione',
          'on-hold': 'In sospeso',
          completed: 'Completato',
          cancelled: 'Annullato',
          refunded: 'Rimborsato',
          failed: 'Fallito',
          'checkout-draft': 'Bozza',
        },
        empty: 'Non hai ancora alcun ordine',
        reorder: 'Riordina',
        details: 'Dettagli ordine',
        createdAt:
          "L'ordine {id} è stato creato il {date} ed è attualmente {status}.",
        notes: "Note sull'ordine",
      },
      addresses: {
        heading:
          "I seguenti indirizzi saranno usati come predefiniti nella pagina di riepilogo dell'ordine.",
        billing: 'Indirizzo di fatturazione',
        shipping: 'Indirizzo di spedizione',
        notSet: 'Indirizzo non impostato',
        delivery: 'Indirizzo di consegna',
        deliveryRequired: "L'indirizzo di consegna è obbligatorio",
        differentBilling: 'Fatturare ad un indirizzo differente?',
        checkPostCode: 'Verifica se il tuo indirizzo è coperto dal servizio',
        checkAddress: 'Verifica indirizzo',
        postcode: 'CAP',
        invalidPostCode: 'CAP non valido',
        city: 'Città',
        province: 'Provincia',
        country: 'Nazione/Regione',
        address: 'Via e Numero',
        address2: 'Appartamento, suite, unità, piano, ecc. (opzionale)',
        addressPlaceholder: 'Via/Piazza e Numero Civico',
        timeSlot: 'Scegli una fascia oraria per la consegna:',

        company: 'Azienda',
        cf: 'CF',
        cfFull: 'Codice fiscale',
        vat: 'P. IVA',
        vatFull: 'P. IVA',
        sdi: 'SDI',
        sdiFull: 'SDI',
        pec: 'PEC',
      },
      invoice: {
        requestInvoice: 'Desideri ricevere la fattura?',
        answerRequestInvoice: 'Fattura richiesta? {answer}',
        private: 'privato',
        isPrivate: '@:common.yes, sono un @:invoice.private',
        hasPrivate: '@:common.yes, come @:invoice.private',
        company: 'azienda',
        isCompany: "@:common.yes, sono un'@:invoice.company",
        hasCompany: '@:common.yes, come @:invoice.company',
      },
      notifications: {
        logout: 'Logout avvenuto con successo',
        forcedLogout:
          'La sessione è scaduta, si prega di rieffettuare il login',
      },
      pages: {
        company: {
          firstSection: {
            supTitle: 'freschezza e qualità dalle nostre terre',
            title: 'una storia che abbraccia passato e futuro',
            paragraph:
              'Naturalee ha solide radici sia nel mercato ortofrutticolo milanese che nelle fertili terre del Lazio. Grazie alla sua rete di fornitori e alla sua efficienza operativa, è in grado di fornire prodotti freschi e di qualità direttamente alle vostre porte.',
          },
          secondSection: {
            circularText: 'Lorem ipsum dolor sit amet',
            title: 'Coltiviamo passione, {highlight} gusto',
            highlightText: 'Raccogliamo',
            paragraph:
              'La nostra missione è un connubio di tradizione e innovazione. Ci impegniamo a consegnare a voi e alla vostra attività la migliore selezione di frutta, verdura, latticini, vini, spezie e molto altro.La freschezza di ieri incontra la comodità di oggi guardando avanti con entusiasmo. Volete frutta e verdura di alta qualità a portata di clic? Saremo il vostro punto di riferimento.',
          },
          thirdSection: {
            title: 'Cuore e Impegno in ogni fase',
            firstBox: {
              title: '+20 Ettari',
              paragraph:
                'Le fertili terre del Lazio, con il loro ricco patrimonio naturale, sono la fonte della straordinaria qualità dei nostri prodotti. Un terreno ideale per la produzione di Naturalee.',
            },
            secondBox: {
              title: '25 Anni di esperienza',
              paragraph:
                'La nostra famiglia porta avanti una tradizione di generazioni nella vendita di frutta e verdura al mercato ortofrutticolo di Milano.',
            },
            thirdBox: {
              title: 'Consegna in 24h',
              paragraph:
                "Naturale direttamente a casa vostra. Portiamo la tradizione nel futuro, rendendo più facile che mai l'acquisto online di prodotti di alta qualità.",
            },
          },
          fourthSection: {
            supTitle: "Naturalee per l'Ho.re.ca.",
            title: 'una storia che abbraccia passato e futuro',
            paragraph:
              'Naturalee garantisce qualità e professionalità per soddisfare ogni cliente. Mense, ristoranti, frutterie, alberghi e professionisti della ristorazione possono contare su un servizio puntuale, flessibile e basato sulla onestà.',
            paragraph2:
              "Forniamo all'ingrosso frutta e verdura di origine e qualità certificate, offrendo sempre la migliore frutta al prezzo più conveniente. Per i palati più esigenti, offriamo una vasta gamma di prodotti regionali italiani e stranieri, oltre a prelibatezze esotiche.",
          },
        },
      },
    },
  },
}))
