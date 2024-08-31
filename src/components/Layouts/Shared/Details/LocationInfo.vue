<template>
  <div class="location detail-item">
    <img src="@/assets/slices/ic_location@3x.png" alt="Location" />
    <span> {{ house.location.zip }} {{ house.location.city }} </span>
  </div>
</template>

<script>
export default {
  name: "LocationInfo",
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.location {
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  img {
    margin-right: 8px;
    width: 18px;
    height: 18px;
  }
}
</style>
