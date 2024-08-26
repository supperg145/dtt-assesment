<template>
  <div class="no-results">
    <img src="../assets/slices/img_empty_houses@3x.png" alt="" />
    <h1>No Results Found</h1>
    <p>Please try another keyword</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.no-results {
  margin: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    height: 200px;
  }
}
</style>
