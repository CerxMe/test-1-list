<template lang="pug">
// This is a 3x3 #grid
.grill
  .slot.top.left
  .slot.top.middle
  .slot.top.right
  .slot.middle.left
  .slot.center
  .slot.middle.right
  .slot.bottom.left
  .slot.bottom.middle
  .slot.bottom.right
</template>

<script setup>

</script>

<style scoped lang="stylus">
@import "../theme.styl"
.grill
  border-radius 3px
  border 1px solid $sealstroke
  display flex
  flex-direction row
  justify-content center
  align-content center
  flex-wrap wrap
  .slot
    flex-grow 1
    min-width 33%
    min-height 42px
    background $seal

borsty= 1px solid $sealfill
pb(p)
  if p is 'top'
    border-top borsty
  if p is 'left'
    border-left borsty
  if p is 'right'
    border-right borsty
  if p is 'bottom'
    border-bottom borsty

.slot
  &.top.left
    pb('bottom')
    pb('right')
  &.top.middle
    pb('left')
    pb('bottom')
    pb('right')
  &.top.right
    pb('left')
    pb('bottom')
  &.middle.left
    pb('top')
    pb('right')
    pb('bottom')
  &.center
    border borsty
  &.middle.right
    pb('top')
    pb('left')
    pb('bottom')
  &.bottom.left
    pb('top')
    pb('right')
  &.bottom.middle
    pb('top')
    pb('left')
    pb('right')
  &.bottom.right
    pb('top')
    pb('left')
</style>