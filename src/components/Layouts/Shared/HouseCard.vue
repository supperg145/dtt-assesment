<template>
  <div class="house-card" @click="handleClick">
    <div class="houseimage">
      <img :src="house.image" alt="House image" />
    </div>
    <div v-if="house.madeByMe" class="action-buttons">
      <router-link
        :to="`/house/edit/${house.id}`"
        class="edit-button"
        @click.stop
      >
        <img src="@/assets/slices/ic_edit@3x.png" alt="Edit" />
      </router-link>
      <router-link
        :to="`/house/delete/${house.id}`"
        class="delete-button"
        @click.stop
      >
        <img src="@/assets/slices/ic_delete@3x.png" alt="Delete" />
      </router-link>
    </div>
    <div class="houseinfo">
      <h2>{{ house.location.street }} {{ house.location.houseNumber }}</h2>
      <p>{{ formattedPrice }}</p>
      <span class="location">
        {{ house.location.zip }} {{ house.location.city }}
      </span>
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
          <img src="@/assets/slices/ic_size@3x.png" alt="Size" />
          <span>{{ house.size }} m2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "HouseCard",
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("click", this.house.id);
    },
  },
  setup(props) {
    const formattedPrice = computed(() => {
      return new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
      }).format(props.house.price);
    });

    return { formattedPrice };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

.house-card {
  border: 1px solid #ddd;
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  height: 200px;
  cursor: pointer;
  position: relative;

  .houseimage {
    flex-shrink: 0;
    width: 200px;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .action-buttons {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    z-index: 1;

    .edit-button,
    .delete-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: transparent;
      border: none;
      cursor: pointer;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  .houseinfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    color: $text-color-secondary;

    h2 {
      color: $text-color-primary;
    }

    .house-details {
      display: flex;
    }

    .location {
      color: $color-tertiary-dark;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-right: 8px;

      span {
        font-size: 14px;
      }
    }

    img {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
