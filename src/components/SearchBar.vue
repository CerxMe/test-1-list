<template lang="pug">
main(:class="$style.searchBar")
  input(type="text"
    placeholder="Search or Add..."
    :value="searchText"
    @input="$emit('update:searchText', $event.target.value)"
    @keyup.enter="submit(searchText)"
    @keydown.esc="$emit('update:searchText', '')"
  )
  div(:class="$style.controls" v-if="searchText !== ''")
    button(:class="$style.cancel" type="button" @click="$emit('update:searchText', '')")
      Cancel
    button(:class="$style.add" type="button" :disabled='!matchFound' @click="submit(searchText)")
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

<style lang="scss" module scoped>
@use '../sass/_color.scss';

.searchBar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: color.$input-bg;
  height: 60px;

  input {
    font-size: 14px;
    color: color.$text-primary;
    background: none;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    border: none;
    outline: none;

    &::placeholder {
      color: color.$input-placeholder;
    }
  }

  .controls {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;

    button {
      margin-right: 20px;
      height: 100%;
      border: none;
      outline: none;
      background: none;
      cursor: pointer;
    }
    .add {
      color: color.$cyan;
      &:disabled {
        color: color.$input-placeholder;
        cursor: not-allowed;
      }
    }
    .cancel {
      color: color.$red;
    }
  }
}
</style>
