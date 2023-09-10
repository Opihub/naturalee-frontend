export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'it',
  messages: {
    it: {
      edit: 'Modifica',
      quantity: 'Quantità',
      product: '{count} prodotto | {count} prodotti',
      cart: {
        your: 'Il tuo carrello',
        empty: 'Non hai alcun prodotto nel carrello',
        cleared: 'Il carrello è stato svuotato',
        missingProduct: 'Prodotto non trovato nel carrello',
        quantityUpdated: '@:quantity aggiornata | @:quantity aggiornate',
        addedToCart:
          '{count} {name} aggiunto al carrello | {count} {name} aggiunti al carrello',
        removedFromCart:
          '{name} rimosso dal carrello | Prodotti rimossi dal carrello',
      },
      coupon: {
        formTitle: 'Hai un codice sconto?',
        formPlaceholder: 'Codice promozionale',
      },
    },
  },
}))
