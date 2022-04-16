<template lang="pug">
section(:class="$style.searchResults")
  .noResults(v-if="!props.results.length")
    h3 Added items will appear here.

  div(:class="$style.results" v-for="result in results" v-else)
    ListItem(:result="result" :key='result.id' :matches="highlight === result.id" @delete="(id) => $emit('deleteItem', id)")


</template>

<script setup lang="ts">
import ListItem from './ListItem.vue';
import { defineProps, defineEmits } from 'vue';
import IListItem from '../interfaces/IListItem';
const props = defineProps({
  results: {
    type: Object as () => [IListItem],
    required: true,
  },
  highlight: {
    type: Number,
  },
});
const emit = defineEmits(['deleteItem']);
</script>

<style lang="scss" module>
.searchResults {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  .results {
    width: 100%;
  }
}
.delete {
  display: none;
}
</style>
