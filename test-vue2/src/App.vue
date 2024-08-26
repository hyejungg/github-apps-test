<script setup>
import ModalComp from "./ModalComp.vue";
import { ref } from "vue";

const showModal = ref(false);
const showModal2 = ref(false);
</script>

<template>
  <button data-test="show-modal" id="show-modal" @click="showModal = true">
    Show Modal
  </button>
  <button data-test="show-modal" id="show-modal" @click="showModal2 = true">
    Show Modal2
  </button>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal-comp :show="showModal" @close="showModal = false">
      <template #header>
        <h2 data-test="show-header">Information</h2>
      </template>
      <template #body>
        <p data-test="show-body">안녕하세요. 몰리입니다.</p>
      </template>
      <template #footer>
        <button data-test="show-footer" @click="showModal = false">
          Close
        </button>
      </template>
    </modal-comp>
  </Teleport>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal-comp :show="showModal2" @close="showModal2 = false">
      <template #header>
        <h2 data-test="show-header">Document</h2>
      </template>
      <template #body>
        <p data-test="show-body">안녕하세요. 바보입니다.</p>
      </template>
      <template #footer>
      <button data-test="show-footer" @click="showModal2 = false">
        Close
      </button>
      </template>
    </modal-comp>
  </Teleport>
</template>
