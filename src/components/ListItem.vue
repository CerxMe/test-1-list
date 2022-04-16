<template lang="pug">
section(:class="$style.result")
  header(v-if="matches" )
    h2(:class="$style.title") match
  main
    h2(:class="$style.title")
      | {{ content }}
    p(:class="$style.description")
      | \#{{ id }}
  footer
    p(:class="$style.added")
    | {{ timeAgo }}
    button.delete(:class="$style.delete" @click="$emit('delete', id)")
      | Delete
</template>

<script setup lang="ts">
import { defineProps,defineEmits, ref, onMounted, onUnmounted } from "vue";
import { formatDistance } from "date-fns";
import IListItem from "../interfaces/IListItem";
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

  main{
    width: 100%;
    h2 {
      font-size: 14px;
      font-weight: normal;
      color: #212529;
    }
    p {
      color: #868E96;
      font-size: 12px;
    }
  }
  header, footer{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  footer {
    flex-direction: row;
  }

  &:hover {
    box-shadow: 0px 0px 40px #0000000D;
    background-color: #FFFFFF;
    .delete {
      display: block;
    }
  }
}
</style>
