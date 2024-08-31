<template>
  <div class="house-detailed-info">
    <p>{{ house.description }}</p>
  </div>
</template>

<script>
export default {
  name: "HouseDescription",
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.house-detailed-info {
  font-size: 16px;
  line-height: 1.5;
  margin-top: 16px;

  p {
    margin: 8px 0;
  }
}
</style>
