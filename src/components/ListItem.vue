<template lang="pug">
section(:class="$style.result")
  header(v-if="matches" )
    Check
  main
    h2(:class="$style.title")
      | {{ content }}
    p(:class="$style.description")
      span(v-if="matches" ) Exact match
      | {{ matches ? ', ' : ''}}\#{{ id }}
  footer
    p(:class="$style.added")
      | {{ timeAgo }}
    button.delete(:class="$style.delete" @click="$emit('delete', id)")
      Trash
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';
import { formatDistance } from 'date-fns';
import IListItem from '../interfaces/IListItem';
import Trash from './icons/Trash.vue';
import Check from './icons/Check.vue';
const props = defineProps({
  result: {
    type: Object as () => IListItem,
    required: true,
  },
  matches: Boolean,
});
const emit = defineEmits(['delete']);
const { content, id, createdAt } = ref(props.result).value;

const formatTime = (date: Date) =>
  formatDistance(date, new Date(), { addSuffix: true });

const timeAgo = ref(formatTime(new Date(createdAt)));

// bonus points for realtime
// add a ticker to update the timeAgo every minute
// TODO: only update the value when it needs to be updated
let interval: any = null;
onMounted(() => {
  interval = setInterval(() => {
    timeAgo.value = formatTime(new Date(createdAt));
  }, 1000 * 60);
});
//clear the ticker when the component is unmounted
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style lang="scss" module>
@use '../sass/color';
.searchResults {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}
.delete {
  display: none;
}
.result {
  display: flex;
  align-items: center;
  height: 70px;
  width: 100%;
  border-radius: 6px;
  background: none;
  padding-left: 20px;

  main {
    width: 100%;
    h2 {
      font-size: 14px;
      font-weight: normal;
      color: color.$text-primary;
    }
    p {
      color: color.$text-secondary;
      font-size: 12px;
      span {
        color: color.$cyan;
      }
    }
  }
  header,
  footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  header {
    margin-right: 20px;
    color: color.$cyan;
  }
  footer {
    flex-direction: row;
    align-items: center;
    height: 100%;
    p {
      text-align: right;
      min-width: 140px; // prevents the text from going to newline
      font-size: 13px;
      color: color.$text-primary;
    }
    button {
      background: none;
      border: none;
      outline: none;
      height: 100%;
      margin: auto 20px;
      color: color.$red;
      cursor: pointer;
    }
  }

  &:hover {
    box-shadow: 0px 0px 40px color.$list-item-hover-shadow;
    background-color: color.$list-item-hover-bg;
    .delete {
      display: block;
    }
  }
}
</style>
