**live at: https://jocular-parfait-eae439.netlify.app**

spaghetti; covers all the assignment requirements

the design does not specify how to do mobile, so it's not mobile friendly

not bothering with alphabetically ordering my css (lol), the linter doesn't work with the `--fix` option on vue component files.
there's also a bunch of warnings about unused variables and imports, but I'm not sure how to fix 'em. everything works fine on my machine tho.
___
# List

Create a list application from the provided design file [list.xd](list.xd) (can
be opened in [Adobe XD](https://www.adobe.com/products/xd.html)) or available
[here](https://xd.adobe.com/view/3859fb2f-c300-4d3e-8e50-23a085a7ad2c-6d0a/specs/).

## Project setup

- Fork this repository.
- Install dependencies.
- Start dev server.

```bash
# install
npm ci
# serve with hot-reload for development
npm run serve
```

Tips for VSCode extensions.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  for common mistakes
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  for code formatting
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
  for vue support

## Libraries

The following libraries are available, you can import any utility you'll need.

- [date-fns](https://date-fns.org/) `import { } from "date-fns"` (date
  formatting)
- [lodash](https://lodash.com/) `import { } from "lodash"` (utility)

## Requirements

- This project should use [typescript](https://www.typescriptlang.org/) and
  [vue](https://vuejs.org/) (vue components should also use typescript).
- Vue components should use composition api with `setup() { ... }`
  - **Bonus points** when `<script lang="ts" setup>` is used.
  - The `<style>` blocks should use scss modules `<style lang="scss" module>`
- All scss colors should be defined in `sass/_color.scss` file.
  - This can be then used via `@use "sass/color"` in component style blocks.
- Search bar, list item and icons (svg files in assets) should be individual vue
  components.
  - **Tip:** Create icon components simply by copying the svg code to component
    `<template>`

### Search Bar

- Should be a vue component.
- The search bar should use `v-model` for its value, for example
  `<SearchBar v-model="searchQuery" />`
- Non-empty value can be cleared through the clear button, or by pressing Escape
  key.
- If the search bar is empty, the clear and add buttons should be hidden.
- Typing in search bar should filter the displayed list by its value (case
  insensitive), including partial matches.
- If searched string (case insensitive) is already present in the list, the add
  button should be disabled and appropriate item should be marked as "Exact
  match".
- If no exact match is found, the add button should be enabled and click on it
  (or by pressing Enter key) should add the string value to the list.

### List

- List data should be stored in
  [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  in such way, that data in list will be preserved on page refresh.
- Each item in list should keep track of when that item was added to the list.
- Each item should also track in what order it was added in the following way:
  - Starting from #1
  - New item # should be equal to maximum number in list + 1
  - Deleting an item from list will not recalculate # of the remaining items
- **Tip:** There should be a data source _ref_ that is sorted/filtered using
  _computed_.

### List Item

- Should be a vue component.
- Should display delete button on mouse over.
- Should display the added date in human readable format (use date-fns)
- **Bonus points** if the displayed time is updated in realtime.

### Sorting

- List should be sortable by either string value (from a to z) or by added date
  (newest date first).
- Simple click on the _Sort by Value_ or _Sort by Added Date_ buttons should
  sort the list immediately.
- **Bonus points** if the selected sort method is preserved on page refresh.
