<script setup>
import ModalComp from "./ModalComp.vue";
import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal-comp :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Custom Header</h3>
      </template>
    </modal-comp>
  </Teleport>
</template>
