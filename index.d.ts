import { Ref } from 'vue';

export { createModal, useModal } from './src/modal';

export interface Modal {
  currentModal: {
    name: string;
    data: any;
  };
  name: Ref<string>;
  data: Ref<any>;

  update(name: string, data: any): void;
  close(): void;
}