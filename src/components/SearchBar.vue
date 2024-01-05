<template lang="pug">
main.searchBar
  input(type="text"
    placeholder=">"
    :value="searchText"
    @input="$emit('update:searchText', $event.target.value)"
    @keyup.enter="submit(searchText)"
    @keydown.esc="$emit('update:searchText', '')"
  )
  .controls(v-if="searchText !== ''")
    button.cancel(type="button" @click="$emit('update:searchText', '')")
      Cancel
    button.add( type="button" :disabled='!matchFound' @click="submit(searchText)")
      Add
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import Add from './icons/Add.vue';
import Cancel from './icons/Cancel.vue';
// define events
const emit = defineEmits(['update:searchText', 'submit']);

const props = defineProps({
  searchText: {
    type: String,
    required: true,
  },
  matchFound: {
    type: Boolean,
    required: true,
  },
});

function submit(searchText: string) {
  if (searchText === '') {
    return;
  }
  emit('submit', searchText);
}
</script>

<style lang="stylus" scoped>
@import "../theme.styl"
.searchBar
  display flex
  align-items center
  justify-content center
  border-radius 6px
  background $input-bg
  height 42px
  input 
    font-size 14px
    color $text-primary
    background none
    width 100%
    height 100%
    padding-left 20px
    border-radius 6px
    outline none
    border 1px solid rgba($input-placeholder,.2)
    &:active
      border 1px solid $input-placeholder
    &:placeholder
      color $input-placeholder
.controls
  display inline-flex
  flex-direction row
  align-items center
  justify-content center
  height 100%
  margin-left 20px
  button
    margin-right 20px
    height 100%
    border none
    outline none
    background none
    cursor pointer
  .add
    color $cyan
    &:disabled
      color $input-placeholder
      cursor not-allowed
  .cancel
    color $red
</style>
