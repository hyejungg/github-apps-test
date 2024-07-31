<script setup>
import { computed, defineProps } from "vue";
import AxisLabel from "@/component/AxisLabel.vue";
import {valueToPoint} from "@/utils";

const props = defineProps({
  stats: Array,
});

const points = computed(() => {
  const total = props.stats.length;
  return props.stats
    .map((stat, i) => {
      const { x, y } = valueToPoint(stat.value, i, total);
      return `${x},${y}`;
    })
    .join(" ");
});
</script>

<template>
  <g>
    <polygon :points="points"></polygon>
    <circle cx="100" cy="100" r="80"></circle>
    <axis-label
      v-for="(stat, index) in stats"
      :stat="stat"
      :key="index"
      :total="stats.length"
    >
    </axis-label>
  </g>
</template>
