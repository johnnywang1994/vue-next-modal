# vue-next-modal

A vue-next based modal plugin with `modal` component being defined globally.


## Install

``` bash
$ npm install vue-next-modal
// or
$ yarn add vue-next-modal
```


## What plugin does?

This plugin will register a global component named `modal`, which would automatically use the plugin features.

Then you can use `useModal` globally to import the modal instance.


## Usage

### Register

Fisrt to install in your `main.js`

```js
import { createApp } from 'vue';
import { createModal } from 'vue-next-modal';
import App from './App.vue';
import ErrorModal from './components/ErrorModal.vue';

// create a new modal instance
const modal = createModal();

// here we've to wrap all the modals going to be used in the modal.
// The global `modal` component will use `component` tag inside to change
// the modal based on your setting.
const components = {
  ErrorModal,
};

const app = createApp(App)
  // provide components for plugin
  .use(modal, {
    components,
  })
  .mount('#app');
```


### template use

`modal` component has an `loading` slot, which you can used to customize your loading layout for modal.

```html
<template>
  <div class="main">
    <router-view />
  </div>
  <modal :loading="loading" :firstup="true">
    <template #loading>
      Loading Modal...
    </template>
  </modal>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'App',
  setup() {
    // if there's some api calling when landing on page
    // default loading state should be set to "true"
    const loading = ref(true);
    onMounted(() => {
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    });
    return { loading };
  },
};
</script>
```


### About props

There are only 3 props here.

**loading**

  - type: `Boolean`
  - default: `true`
  - description: whether open loading statement


**firstup**

  - type: `Boolean`
  - default: `true`
  - description: Whether modal components should use uppercase for first letter

**modalClass**

  - type: `Object`
  - default: `{}`
  - description: Customize modal-inner classname for UI purpose(eg: changing bg img...)

**wrapperTransition**

  - type: `String`
  - default: fade
  - description: transition name to set outside wrapper

**innerTransition**

  - type: `String`
  - default: `''`
  - description: transition name to set outside inner


### Use in components

```js
import { useModal } from 'vue-next-modal';

export default {
  setup() {
    const modal = useModal();
    // will render & open ErrorModal in modal component
    modal.update('ErrorModal', {
      msg: 'Something Error!'
    });

    // will close modal after 2 seconds
    setTimeout(() => {
      modal.close();
    }, 2000);
  },
};
```


### About modal object

There are 2 methods, 2 properties in `modal` object.

**name**

  - type: `vue-ref`(`String`)
  - default: undefined
  - description: This is modal's name which directly based to your component name
> after calling `close` method, name will become `undefined` which auto close the modal.

**data**

  - type: `vue-ref`(`Object`)
  - default: `{}`
  - description: Modal data, you can define whatever inside the data to bring to your modal component
> after calling `close` method, data will become `{}`.

**update**

  - type: `Function`
  - description: Update the modal content

**close**

  - type: `Function`
  - description: Close the modal


### Emits

Then the grey overlay is clicked, it'll emit an event called `close`
