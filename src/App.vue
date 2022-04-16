<template lang="pug">
// It's fun to debug indentaion errors
div
  main(:class="$style.container")
    section(:class="$style.searchbar")
      SearchBar(v-model:search-text="searchText"
        :matchFound="!items.find((i) => i.content === searchText)"
        @submit="submit"
      )
    // Display results
    section(:class="$style.list")
      List( :results="search(searchText)" :highlight="items.find((i) => i.content === searchText)?.id" @deleteItem="(id) => removeItemById(id)" )
    aside(:class="$style.options")
      // Display sort options
      SearchOptions(:options="options" @selectOption="setSearchOptions")
</template>

<script setup lang="ts">
// Note: no idea what I'm doing with TypeScript
import SearchBar from './components/SearchBar.vue';
import SearchOptions from './components/SearchOptions.vue';
import List from './components/List.vue';
import IListItem from './interfaces/IListItem';
import ISearchOptions from './interfaces/ISearchOptions';
import { ref, onMounted } from 'vue';

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
  const matches = items.value.filter((item) => item.content.includes(value));
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
  console.log('submit', value);
  // Add item to the list if they don't already exist
  const item = {
    id: getMaxListId(),
    content: value,
    createdAt: new Date(),
  };
  if (!items.value.find((i) => i.content === value)) {
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

<style lang="scss" module>
.container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 800px 1fr;
  grid-template-rows: auto 1fr;
  gap: 0px 0px;
  grid-template-areas:
    '. searchbar .'
    '. list options';
}
.searchbar {
  grid-area: searchbar;
  margin-top: 100px;
}
.list {
  grid-area: list;
  height: 100%;
}
.options {
  grid-area: options;
  margin-top: 30px;
  margin-left: 60px;
}
</style>
