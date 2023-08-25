<template>
  <ModalContainer
    :class="CSS_NAME"
    :max-width="1088"
    title="Verifica se il tuo indirizzo è coperto dal servizio"
  >
    <template #header>
      <BaseHeading tag="span"
        >Verifica se il tuo indirizzo è coperto dal servizio</BaseHeading
      >
    </template>

    <form method="POST" :class="`${CSS_NAME}__form`" @submit.prevent="checkPostcode">
      <InputField v-model="formData.postcode" name="postcode" rounded
        >CAP</InputField
      >

      <InputField
        v-model="formData.address"
        :class="`${CSS_NAME}__form__address`"
        name="address"
        rounded
        >Indirizzo di consegna</InputField
      >

      <BaseButton color="green" type="submit" text="Verifica indirizzo" />
    </form>
  </ModalContainer>
</template>

<script setup>
const CSS_NAME = 'c-postcode-modal'

const formData = reactive({
  postcode: '',
  address: '',
})

const checkPostcode = () => {
  console.debug(formData)
  // TODO
}
</script>

<style lang="scss">
$prefix: 'postcode-modal';
@include component($prefix) {
  @include object('heading') {
    color: get-var(color-green);
    font-weight: inherit;
    @include typography(18px, 23px);

    @include from(tablet) {
      @include typography(22px, 28px);
    }
  }

  font-size: rem(18px);
  line-height: rem(24px);
  font-weight: get-var(weight-bold);

  @include element('form') {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    gap: rem(30px);

    @include from(tablet) {
      flex-direction: row;
      flex-wrap: nowrap;
      gap: rem(20px);
      align-items: flex-end;
      justify-content: space-between;
    }

    @include set-local-vars(
      $prefix: 'input',
      $map: (
        font-size: rem(20px),
        line-height: rem(24px),
        font-weight: inherit,
        padding: rem(18px) rem(20px),
      )
    );

    @include set-local-vars(
      $prefix: 'input-field-label',
      $map: (
        margin: 0 0 rem(5px),
        padding: 0 rem(20px),
      )
    );

    @include set-local-vars(
      $prefix: 'button',
      $map: (
        font-size: inherit,
        line-height: inherit,
        padding: rem(20px) rem(44px),
      )
    );

    @include object('button') {
      flex: 0 0 auto;
    }

    @include element('address') {
      flex-grow: 2;
    }
  }
}
</style>
