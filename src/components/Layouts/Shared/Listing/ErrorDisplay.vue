<template>
  <div v-if="error" class="error-container">
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: String,
  },
};
</script>

<style scoped lang="scss">
.error-container {
  color: red;
  margin-top: 10px;
}
</style>
