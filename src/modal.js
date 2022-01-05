import { reactive, inject, computed, getCurrentInstance } from 'vue';
import Modal from './Modal.vue';

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) => 
  hasSymbol
    ? Symbol( '[vue-next-modal]: ' + name )
    : ( '[vue-next-modal]: ' ) + name;

const modalKey = PolySymbol('vue-next-modal');

let activeModal;

function defineProp(target, key, options) {
  Object.defineProperty(target, key, options);
}

function applyModalPlugin(app, modal, options) {
  Modal.components = options.components;
  app.component(options.globalName || 'Modal', Modal);
  app.config.globalProperties.$modal = modal;
  app.provide(modalKey, modal);
  activeModal = modal;
}

export function createModal() {
  const currentModal = reactive({
    name: undefined,
    data: {}
  });
  function update(name, data = {}, remain = false) {
    currentModal.name = name;
    if (remain) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          currentModal.data[key] = data[key];
        }
      }
    } else {
      currentModal.data = data;
    }
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
  return (getCurrentInstance() && inject(modalKey)) || activeModal;
}
