<template lang="pug">
main
  button(
    @click="$emit('selectOption', {sortBy: 'content',sortOrder: 'asc'})"
  ) a - z
  button(
    @click="$emit('selectOption', {sortBy: 'content',sortOrder: 'desc'})"
  ) z - a
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import ISearchOptions from "../interfaces/ISearchOptions";
console.log('penis')
const sort = ref()
const props = defineProps({
  options: Object as () => ISearchOptions,
})
const emit = defineEmits(['selectOption'])
</script>

<style lang="scss" module scoped>
@use '../sass/_color.scss';

</style>
