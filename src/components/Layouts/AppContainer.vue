<template>
  <div class="appcontainer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppContainer",
  props: {},
};
</script>

<style lang="scss" scoped>
.appcontainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: var(--color-background-1);
  border-radius: 8px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 15px;
  }
}
</style>
