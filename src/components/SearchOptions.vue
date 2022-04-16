<template lang="pug">
main(:class="$style.options")
  button(
    @click="$emit('selectOption', {sortBy: 'content',sortOrder: 'asc'})"
    :class="options.sortBy === 'content' ? $style.selected : null"
  ) Sort by
    span
      | Value
  button(
    @click="$emit('selectOption', {sortBy: 'dateAdded',sortOrder: 'asc'})"
    :class="options.sortBy === 'dateAdded' ? $style.selected : null"
  ) Sort by
    span
      | Added Date
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import ISearchOptions from '../interfaces/ISearchOptions';
defineProps({
  options: {
    type: Object as () => ISearchOptions,
    required: true,
  },
});
defineEmits(['selectOption']);
</script>

<style lang="scss" module scoped>
@use '../sass/_color.scss';
.options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: none;
    padding-left: 15px;
    font-size: 13px;
    border: none;
    outline: none;
    border-radius: 6px;
    min-width: 200px;
    min-height: 40px;
    color: color.$text-secondary;
    text-align: left;
    &.selected {
      background-color: color.$list-item-hover-bg;
      &:after {
        content: '';
        background: color.$cyan;
        height: 4px;
        width: 4px;
        margin: 18px;
        border-radius: 50%;
      }
    }
    span {
      color: color.$text-primary;
      flex-grow: 1;
      margin-left: 6px;
    }
    &:nth-child(1) {
      margin-bottom: 10px;
    }
  }
}
</style>
