<template>
  <transition :name="wrapperTransition">
    <div
      class="modal-wrapper"
      v-show="showModal"
      @click.self="onWrapperClicked"
    >
      <slot></slot>
      <div class="loading" v-if="showModal && loading">
        <slot name="loading"></slot>
      </div>
      <transition :name="innerTransition">
        <div :class="['modal-inner', modalClass]" v-show="showModal && !loading">
          <component :is="firstup ? adjustString(modal.name) : modal.name" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { useModal } from './modal';

export default {
  name: 'Modal',
  props: {
    loading: {
      type: Boolean,
      default: true,
      description: 'whether use loading statement',
    },
    firstup: {
      type: Boolean,
      default: true,
      description: 'Whether modal components should use uppercase for first letter',
    },
    modalClass: {
      type: Object,
      default: () => ({}),
      description: 'Customize modal-inner classname for UI purpose',
    },
    wrapperTransition: {
      type: String,
      default: 'fade',
    },
    innerTransition: {
      type: String,
      default: '',
    },
  },
  methods: {
    onWrapperClicked() {
      return this.$emit('close');
    },
  },
  setup() {
    const modal = useModal();
    const showModal = modal.name;
    const adjustString = (str) =>
      str.value && str.value.charAt(0).toUpperCase() + str.value.slice(1);
    return { modal, adjustString, showModal };
  },
};
</script>

<style lang="scss">
@mixin fullcover() {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

@mixin alignCenter() {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-wrapper {
  @include fullcover;
  position: fixed;
  z-index: 997;
  animation-duration: 0.3s;
  > .loading {
    @include alignCenter;
  }
  > .modal-inner {
    @include alignCenter;
    z-index: 998;
    animation-duration: 0.3s;
  }
}
</style>
