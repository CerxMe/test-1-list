<template lang="pug">
main(:class="$style.searchBar")
  input(type="text"
    placeholder="Search or Add..."
    :value="searchText"
    @input="$emit('update:searchText', $event.target.value)"
    @keyup.enter="submit(searchText)"
    @keyup.esc="$emit('update:searchText', '')"
  )
  div(:class="$style.controls" v-if="searchText !== ''")
    button(type="button" @click="$emit('update:searchText', '')") clear
    button(type="button" :disabled='!matchFound' @click="submit(searchText)") add
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted, onUnmounted } from "vue";

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
  background: #f1f3f5;
  height: 60px;
  input {
    font-size: 14px;
    color: #212529;
    background: none;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    border: none;
    outline: none;
    &::placeholder {
      color: #adb5bd;
    }
    &:focus { // super subtle
      box-shadow: 0px 0px 40px #FFFFFFFD;
    }
  }

  .controls {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    button {
      height: 100%;
      width: 60px;
      border: none;
      outline: none;
    }
  }
}
</style>
