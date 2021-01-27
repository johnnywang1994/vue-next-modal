import { reactive, inject, computed } from 'vue';
import Modal from './Modal.vue';

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) => 
  hasSymbol
    ? Symbol( '[vue-next-modal]: ' + name )
    : ( '[vue-next-modal]: ' ) + name;

const modalKey = PolySymbol('vue-next-modal');

function defineProp(target, key, options) {
  Object.defineProperty(target, key, options);
}

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
  const name = computed(() => currentModal.name || false);
  const data = computed(() => currentModal.data);
  const modal = {
    currentModal,
    update,
    close,
    install(app, options) {
      applyModalPlugin(app, this, options);
    }
  };
  defineProp(modal, 'name', { get: () => name });
  defineProp(modal, 'data', { get: () => data });
  return modal;
}

export function useModal() {
  return inject(modalKey);
}
