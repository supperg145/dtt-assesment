<template>
  <div class="house-summary">
    <div class="detail-item">
      <img src="@/assets/slices/ic_price@3x.png" alt="Price" />
      <span>{{ formattedPrice }}</span>
    </div>
    <div class="detail-item">
      <img src="@/assets/slices/ic_size@3x.png" alt="Size" />
      <span>{{ house.size }} m2</span>
    </div>
    <div class="detail-item">
      <img src="@/assets/slices/ic_construction_date@3x.png" alt="Year" />
      <span>Built in {{ house.constructionYear }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseSummary",
  props: {
    house: {
      type: Object,
      required: true,
    },
    formattedPrice: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.house-summary {
  display: flex;
  width: 100%;
  margin-bottom: 24px;

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
