<template lang="pug">
section.searchResults
  .noResults(v-if="!results.length")
    h3 Added items will appear here.
  .results(v-for="result in results" v-else)
    ListItem(:result="result" :key='result.id' :matches="highlight === result.id" @delete="(id) => $emit('deleteItem', id)")
</template>

<script setup lang="ts">
import ListItem from './ListItem.vue';
import { defineProps, defineEmits } from 'vue';
import type {IListItem} from '../interfaces/IListItem'

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

<style lang="stylus" scoped>
.searchResults
  display flex
  flex-direction column
  align-items center
  justify-content center
  width 100%
  margin-top 30px
  .results
    width 100%
.delete
  display none
</style>
