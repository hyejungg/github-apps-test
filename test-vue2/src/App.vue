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
        <h2>Information</h2>
      </template>
      <template #body>
        <p>안녕하세요. 몰리입니다.</p>
      </template>
      <template #footer>
        <button @click="showModal = false">Close</button>
      </template>
    </modal-comp>
  </Teleport>
</template>
