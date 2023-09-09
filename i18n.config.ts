export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'it',
  messages: {
    it: {
      edit: 'Modifica',
      product: '{count} prodotto | {count} prodotti',
      cart: {
        your: 'Il tuo carrello',
        empty: 'Non hai alcun prodotto nel carrello',
        addedToCart:
          '{count} {name} aggiunto al carrello | {count} {name} aggiunti al carrello',
      },
    },
  },
}))
