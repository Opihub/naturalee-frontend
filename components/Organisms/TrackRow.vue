<template>
  <BackgroundHolder :class="CSS_NAME" tag="section" :color="color">
    <SiteContainer class="u-mb-half u-mb-large@desktop">
      <BaseHeading v-if="slots['title']" :tag="titleTag" use="h2"
        ><slot name="title"
      /></BaseHeading>
    </SiteContainer>

    <SiteContainer
      ref="stage"
      :class="`${CSS_NAME}__animation`"
      flex
      :max-width="'100%'"
    >
      <div :class="CSS_NAME_STEPS">
        <TrackDesktop
          v-show="isFull"
          ref="track"
          :class="[
            `${CSS_NAME_STEPS}__track`,
            `${CSS_NAME_STEPS}__track--desktop`,
          ]"
        />
        <TrackMobile
          v-show="isMobile"
          ref="trackMobile"
          :class="[
            `${CSS_NAME_STEPS}__track`,
            `${CSS_NAME_STEPS}__track--mobile`,
          ]"
        />

        <ol :class="`${CSS_NAME_STEPS}__points`">
          <li
            ref="firstPoint"
            :class="[
              `${CSS_NAME_STEPS}__points__single`,
              `${CSS_NAME_STEPS}__points__single--first`,
            ]"
          >
            <span>
              <slot name="firstPoint" />
            </span>
          </li>
          <li
            ref="secondPoint"
            :class="[
              `${CSS_NAME_STEPS}__points__single`,
              `${CSS_NAME_STEPS}__points__single--second`,
            ]"
          >
            <span>
              <slot name="secondPoint" />
            </span>
          </li>
          <li
            ref="thirdPoint"
            :class="[
              `${CSS_NAME_STEPS}__points__single`,
              `${CSS_NAME_STEPS}__points__single--third`,
            ]"
          >
            <span>
              <slot name="thirdPoint" />
            </span>
          </li>
          <li
            ref="fourthPoint"
            :class="[
              `${CSS_NAME_STEPS}__points__single`,
              `${CSS_NAME_STEPS}__points__single--fourth`,
            ]"
          >
            <span>
              <slot name="fourthPoint" />
            </span>
          </li>
        </ol>
      </div>

      <NuxtImg
        ref="truck"
        src="home/van-naturalee.png"
        :class="CSS_NAME_IMAGE"
      />
    </SiteContainer>
  </BackgroundHolder>
</template>

<script setup>
import TrackDesktop from 'assets/svg/track-desktop.svg'
import TrackMobile from 'assets/svg/track-mobile.svg'
import gsap from 'gsap'
import { useIntersectionObserver } from '@vueuse/core'

const CSS_NAME = 'c-track-row'
const CSS_NAME_STEPS = `${CSS_NAME}__steps`
const CSS_NAME_IMAGE = `${CSS_NAME}__image`

defineProps({
  color: {
    type: String,
    default: 'green',
  },
  titleTag: {
    type: String,
    default: 'h2',
  },
})

const slots = useSlots()
const truck = ref(null)

const track = ref(null)
const trackMobile = ref(null)
const isMobile = ref(false)
const stage = ref(false)
const isFull = ref(false)
const isIntermediate = ref(false)

const firstPoint = ref(null)
const secondPoint = ref(null)
const thirdPoint = ref(null)
const fourthPoint = ref(null)
const isPageStart = ref(false)

onBeforeMount(() => {
  isPageStart.value = true
})
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)

  const desktopPath = track.value?.$el.querySelector('path')
  const desktopPathLength = desktopPath.getTotalLength()
  gsap.set(desktopPath, {
    strokeDasharray: desktopPathLength,
    strokeDashoffset: desktopPathLength,
  })

  const mobilePath = trackMobile.value?.$el.querySelector('path')
  const mobilePathLength = mobilePath.getTotalLength()

  gsap.set(mobilePath, {
    strokeDasharray: mobilePathLength,
    strokeDashoffset: mobilePathLength,
  })

  gsap.set(truck.value.$el, { x: '100%' })
  gsap.set(
    [firstPoint.value, secondPoint.value, thirdPoint.value, fourthPoint.value],
    { opacity: 0 }
  )
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  isFull.value = window.innerWidth > 1599.98
  isIntermediate.value = !isMobile.value && !isFull.value

  if (isMobile.value || isIntermediate.value || isFull.value) {
    if (!isPageStart.value) {
      animate()
    }
  }
}

const trackPath = computed(() => {
  let element = track.value?.$el || track.value
  if (!element || isMobile.value) {
    element = trackMobile.value?.$el || trackMobile.value
  }

  return element.querySelector('path')
})

const animate = () => {
  if (isPageStart.value) {
    isPageStart.value = !isPageStart.value
  }
  const timeline = gsap.timeline()

  const pointConfig = {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  }

  timeline
    .to(
      trackPath.value,
      {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'power2.out',
      },
      '+=0'
    )
    .to(firstPoint.value, pointConfig, '<')
    .to(secondPoint.value, pointConfig, '>-=0.5')
    .to(thirdPoint.value, pointConfig, '>-=0.5')
    .to(fourthPoint.value, pointConfig, '>-=0.5')
    .to(
      truck.value.$el,
      {
        x: isIntermediate.value ? '15%' : 0,
        duration: 1,
        ease: 'power2.out',
      },
      '>-=0.5'
    )
}

const { stop } = useIntersectionObserver(
  stage,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      animate()
      stop()
    }
  },
  {
    threshold: 1,
  }
)
</script>

<style lang="scss">
$prefix: 'track-row';
@include component($prefix) {
  $prefix-point: '#{$prefix}-single';

  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding: rem(40px),
      steps-height: rem(290px),
      track-width: rem(27px),
      track-height: rem(580px),
      track-offset: rem(30px),
      point-offset: rem(190px),
      point-step: rem(270px),
      point-size: rem(77px),
      point-font-size: rem(50px),
      point-line-height: rem(63px),
    )
  );

  @include set-vars(
    $prefix: $prefix-point,
    $map: (
      font-size: rem(18px),
      strong-font-size: rem(25px),
      line-height: rem(25px),
    )
  );

  @include between(tablet, full) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        point-step: rem(70px),
        point-offset: rem(50px),
      )
    );
  }

  @include from(full) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        padding: rem(80px),
        track-width: rem(1045px),
        track-height: rem(258px),
        point-size: rem(106px),
        point-font-size: rem(60px),
        point-line-height: rem(75px),
      )
    );

    @include set-local-vars(
      $prefix: $prefix-point,
      $map: (
        font-size: rem(25px),
        line-height: rem(30px),
        strong-font-size: rem(30px),
      )
    );
  }

  @include between(desktop, 1280) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        track-offset: rem(90px),
      )
    );
  }

  padding: get-var(padding, $prefix: $prefix) 0;

  @include element('animation') {
    position: relative;

    @include set-local-vars(
      $prefix: 'container',
      $map: (
        justify-content: flex-end,
      )
    );

    @include from(tablet) {
      @include set-local-vars(
        $prefix: 'container',
        $map: (
          padding: 0,
        )
      );
    }
  }

  @include element('image') {
    position: relative;
    @include between(tablet, full) {
      width: 50%;
      height: 100%;
      object-fit: contain;
      object-position: bottom;
    }
    right: rem(-108px);
    position: absolute;
    bottom: 0;
    margin-top: 0;
    left: calc(
      get-var(padding, $prefix: 'container') +
        get-var(point-size, $prefix: $prefix) / 2
    );

    // @include between(desktop, 1280) {
    //   transform: scale(0.5);
    // }

    @include from(tablet) {
      margin-left: auto;
    }

    @include between(tablet, full) {
      margin-top: rem(20px);
      position: static;
    }

    @include from(full) {
      z-index: 1;
    }
  }

  @include element('steps') {
    position: relative;
    flex: 1 1 auto;
    width: 100%;

    @include between(desktop, 1280) {
      // transform: scale(0.5);
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          track-offset: rem(0px),
        )
      );
    }

    @include from(tablet) {
      width: auto;
      height: get-var(steps-height, $prefix: $prefix);
    }

    @include from(full) {
      width: auto;
    }
    // pointer-events: none;
    // user-select: none;

    @include element('track') {
      width: get-var(track-width, $prefix: $prefix);
      height: get-var(track-height, $prefix: $prefix);
      // max-width: none;
      // transform: translateY(-50%)
      //   translateX(
      //     calc(
      //       (100vw - get-var(width, $prefix: 'container')) / 2 * -1 -
      //         get-var(track-offset, $prefix: $prefix)
      //     )
      //   );

      @include modifier('mobile') {
        display: block;
        position: relative;
        left: calc(get-var(point-size, $prefix: $prefix) / 2);
        transform: translateX(-50%);

        @include from(desktop) {
          display: none;
        }
      }

      @include modifier('desktop') {
        display: none;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 0;
        transform: translate(
          calc(get-var(track-offset, $prefix: $prefix) * -1),
          -50%
        );

        @include from(desktop) {
          display: block;
        }
      }
    }

    @include element('points') {
      counter-reset: track;
      z-index: 2;
      top: 0;
      position: absolute;
      list-style: none;
      padding: 0;
      margin: 0;
      height: 100%;
      left: 0;
      display: flex;
      gap: rem(20px);
      flex-direction: column;

      @include from(tablet) {
        position: relative;
        left: calc(
          get-var(point-offset, $prefix: $prefix) -
            get-var(track-offset, $prefix: $prefix)
        );
      }

      @include element('single') {
        counter-increment: track;
        display: flex;
        align-items: center;
        @include between(tablet, full) {
          align-items: start;
          & span {
            margin-top: 0.8em;
          }
        }
        justify-content: flex-start;
        gap: rem(20px);
        color: get-var(color-white);
        font-size: get-var(font-size, $prefix: $prefix-point);
        line-height: get-var(line-height, $prefix: $prefix-point);

        &::before {
          content: counter(track);
          border-radius: 100%;
          width: get-var(point-size, $prefix: $prefix);
          height: get-var(point-size, $prefix: $prefix);
          border: 4px solid get-var(color-green);
          background-color: get-var(color-white);
          text-align: center;
          color: get-var(color-yellow);
          font-weight: get-var(weight-bold);
          font-size: get-var(point-font-size, $prefix: $prefix);
          line-height: get-var(point-line-height, $prefix: $prefix);
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        b,
        strong {
          font-size: get-var(strong-font-size, $prefix: $prefix-point);
          display: block;
        }

        &:nth-child(even) {
          top: auto;
          bottom: 0;
        }
        @include between(tablet, full) {
          position: absolute;
          left: 0;
          top: calc(
            get-var(point-step, $prefix: $prefix) *
              get-var(point-number, 0, $prefix: $prefix)
          );
          &:nth-child(even) {
            position: absolute;
            top: calc(
              get-var(point-step, $prefix: $prefix) *
                (get-var(point-number, 0, $prefix: $prefix) - 1)
            );
            left: calc(get-var(point-step, $prefix: $prefix) * 3.3);
          }
        }
        @include from(full) {
          position: absolute;
          left: calc(
            get-var(point-step, $prefix: $prefix) *
              get-var(point-number, 0, $prefix: $prefix)
          );
        }
        @include modifier('first') {
        }

        @include modifier('second') {
          @include set-local-vars(
            $prefix: $prefix,
            $map: (
              point-number: 1,
            )
          );
        }

        @include modifier('third') {
          @include set-local-vars(
            $prefix: $prefix,
            $map: (
              point-number: 2,
            )
          );
        }

        @include modifier('fourth') {
          @include set-local-vars(
            $prefix: $prefix,
            $map: (
              point-number: 3,
            )
          );
        }
      }
    }
  }
}
</style>
