import { reactive, inject, computed } from 'vue';
import Modal from './Modal.vue';

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) => 
  hasSymbol
    ? Symbol( '[vue-modal]: ' + name )
    : ( '[vue-modal]: ' ) + name;

const modalKey = PolySymbol('modal');

function applyModalPlugin(app, modal, options) {
  Modal.components = options.components;
  app.component('Modal', Modal);
  app.config.globalProperties.$modal = modal;
  app.provide(modalKey, modal);
}

export function createModal() {
  const currentModal = reactive({
    name: undefined,
    data: {}
  });
  function update(name, data) {
    currentModal.name = name;
    currentModal.data = data || {};
  }
  function close() {
    update(undefined, {});
  }
  const modal = {
    currentModal,
    name: computed(() => currentModal.name ? currentModal.name : false),
    data: computed(() => currentModal.data),
    update,
    close,
    install(app, options) {
      applyModalPlugin(app, this, options);
    }
  };
  return modal;
}

export function useModal() {
  return inject(modalKey);
}
