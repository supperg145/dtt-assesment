<template>
  <div class="house-details">
    <div class="detail-item">
      <img src="@/assets/slices/ic_bed@3x.png" alt="Bedrooms" />
      <span>{{ house.rooms.bedrooms }}</span>
    </div>
    <div class="detail-item">
      <img src="@/assets/slices/ic_bath@3x.png" alt="Bathrooms" />
      <span>{{ house.rooms.bathrooms }}</span>
    </div>
    <div class="detail-item">
      <img src="@/assets/slices/ic_garage@3x.png" alt="Garage" />
      <span v-if="house.hasGarage">Yes</span>
      <span v-else>No</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseDetails",
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.house-details {
  display: flex;
  margin-bottom: 16px;

  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 8px;

    img {
      width: 18px;
      height: 18px;
    }

    span {
      font-size: 16px;
    }
  }
}
</style>
