<template lang="pug">
// It's fun to debug indentaion errors
div
  main.container
    section.searchbar
      SearchBar(v-model:search-text="searchText"
        :matchFound="!items.find((i) => i.content.toLowerCase() === searchText.toLowerCase())"
        @submit="submit"
      )
    // Display results
    section.list
      List( :results="search(searchText)" :highlight="items.find((i) => i.content.toLowerCase() === searchText.toLowerCase())?.id" @deleteItem="(id) => removeItemById(id)" )
    aside.options
      // Display sort options
      SearchOptions(:options="options" @selectOption="setSearchOptions")
</template>

<script setup lang="ts">
import SearchBar from './components/SearchBar.vue';
import List from './components/List.vue';
import type {IListItem} from './interfaces/IListItem'
import type {ISearchOptions} from './interfaces/ISearchOptions';
import { ref, onMounted } from 'vue';
import SearchOptions from "./components/SearchOptions.vue";

// vars
const searchText = ref('');
const items = ref<IListItem[]>([]);
// sets default options
const options = ref<ISearchOptions>({
  sortBy: 'id',
  sortOrder: 'asc',
});

// methods
// TODO: use a better search method (e.g. fuzzy search) for partial matches
function search(value: string): IListItem[] {
  // search for a value
  const matches = items.value.filter((item) =>
    item.content.toLowerCase().includes(value.toLowerCase())
  );
  // return results, default to all items
  const results = matches || items.value;
  // sort results
  return results.sort((a, b) => {
    switch (options.value.sortBy) {
      case 'id': // sort by id (added this before checking the readme)
        if (options.value.sortOrder === 'desc') {
          return b.id - a.id;
        }
        return a.id - b.id;
      case 'content': // sort alphabetically
        if (options.value.sortOrder === 'desc') {
          return b.content.localeCompare(a.content);
        }
        return a.content.localeCompare(b.content);
      case 'dateAdded': // sort by date added
        if (options.value.sortOrder === 'asc') {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
        return a.createdAt.getTime() - b.createdAt.getTime();
    }
  });
}

function setSearchOptions(o: ISearchOptions) {
  options.value = o;
}

function getMaxListId(): number {
  // makes sure the id number is unique
  return items.value.reduce((max, item) => Math.max(max, item.id) + 1, 1); // start at 1
}

function submit(value: string) {
  // Add item to the list if they don't already exist
  const item = {
    id: getMaxListId(),
    content: value,
    createdAt: new Date(),
  };
  if (
    !items.value.find((i) => i.content.toLowerCase() === value.toLowerCase())
  ) {
    items.value.push(item);
    return true;
  }
  return false;
}

function removeItemById(id: number) {
  const filteredItems = items.value.filter((item) => item.id !== id);
  items.value = filteredItems;
}

onMounted(() => {
  // Check localstorage for existing items
  const existingItems = localStorage.getItem('items');
  if (existingItems) {
    // TODO: make sure this doesn't cause a crash when user edits the localStorage values
    items.value = JSON.parse(existingItems).map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt), // convert date string to date object
    }));
    console.log(`Loaded ${items.value.length} items from localStorage`);
  }
  // Check localstorage for existing options
  const existingOptions = localStorage.getItem('options');
  if (existingOptions) {
    options.value = JSON.parse(existingOptions);
    console.log(`Loaded options from localStorage`);
  }

  // Save options and items to localStorage on page unload
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('items', JSON.stringify(items.value));
    localStorage.setItem('options', JSON.stringify(options.value));
    console.log(
      `Saved options and ${items.value.length} items to localStorage`
    );
  });
});
</script>

<style lang="stylus">
// Global Import
@import "./theme.styl"
*
  display block
  box-sizing border-box
  margin 0
  padding 0
html,body
  height 100%
  min-height 100%
html
  color $text-primary
  font-family 'Open Sans', sans-serif
  font-size 87.5%
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
// If you need to style the #app element
#app
  align-items center
  background linear-gradient(180deg, $bg-gradient-from 0%, $bg-gradient-to 100%)
  display flex
  flex-direction column
  justify-content flex-start
  min-height 100vh
.container
  width 100%
  display grid
  grid-template-columns 1fr 800px 1fr
  grid-template-rows auto 1fr
  gap 0px 0px
  grid-template-areas '. searchbar .' '. list options'
.searchbar
  grid-area searchbar
  margin-top 100px
.list
  grid-area list
  height 100%
.options
  grid-area options
  margin-top 30px
  margin-left 60px
</style>