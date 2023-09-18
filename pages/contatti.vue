<template>
  <main class="s-contacts">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />
    <div class="o-row row-contacts">
      <SiteContainer>
        <SiteContainer class="o-row__container o-row__container--left" padless>
          <slot name="header">
            <BaseHeading class="u-mb-small" tag="h3">{{
              $t('form.contactUs')
            }}</BaseHeading>
          </slot>
          <BaseParagraph class="u-mb-small">{{
            $t('form.moreInfo')
          }}</BaseParagraph>
          <BaseHeading class="u-mt-huge" tag="h6">{{
            $t('company.name')
          }}</BaseHeading>
          <BaseParagraph class="u-mb-small"
            >{{ $t('company.address') }} <br />
            {{ $t('company.city') }}<br />
            {{ $t('company.state') }}</BaseParagraph
          >
          <BaseParagraph class="u-mb-small"
            >{{ $t('company.pIva') }} <br />
            {{ $t('company.cf') }}<br />
            {{ $t('company.rea') }}<br />
            {{ $t('company.capSoc') }}
          </BaseParagraph>
        </SiteContainer>
        <SiteContainer class="o-row__container o-row__container--right" padless>
          <BackgroundHolder tag="div" color="white" content-center>
            <ContactForm />
          </BackgroundHolder>
        </SiteContainer>
      </SiteContainer>
    </div>
  </main>
</template>

<script setup>
const { page } = await usePage('contatti')
</script>

<style lang="scss" scoped>
$prefix: 'contacts';
@include scope($prefix) {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );
  @include layout($prefix, 'container');
  @include object('row') {
    @include object('container') {
      @include object('background') {
        padding: 50px;
        border-radius: 30px;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include from('tablet') {
        flex-direction: row;
      }
    }
    @include element('container') {
      display: block;
      @include from('tablet') {
        @include set-local-vars(
          $prefix: 'container',
          $map: (
            margin: 50px 0,
          )
        );
        @include modifier('left') {
          width: 50%;
        }
        @include modifier('right') {
          width: 100%;
        }
      }
    }
  }
}
</style>
