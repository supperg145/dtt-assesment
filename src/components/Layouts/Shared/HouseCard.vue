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
      <button class="delete-button" @click.stop="showDeletePopup = true">
        <img src="@/assets/slices/ic_delete@3x.png" alt="Delete" />
      </button>
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

    <DeleteConfirmationPopup
      :isVisible="showDeletePopup"
      @confirm="deleteListing(house.id)"
      @cancel="showDeletePopup = false"
    />

    <div v-if="deleteError" class="error-message">{{ deleteError }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
import DeleteConfirmationPopup from "@/components/DeleteConfirmationPopup.vue";
import { useDeleteListing } from "@/composables/useDeleteListing";

export default {
  name: "HouseCard",
  components: {
    DeleteConfirmationPopup,
  },
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

    const { showDeletePopup, deleteError, deleteListing } = useDeleteListing();

    return { formattedPrice, showDeletePopup, deleteListing, deleteError };
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
  height: 200px; // Allow height to adjust based on content
  cursor: pointer;
  position: relative;

  .houseimage {
    flex-shrink: 0;
    width: 200px;
    /* Set aspect ratio to maintain 4:3, adjust as needed */
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 4px;
    position: relative; // Added to position the img correctly

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // Ensures the image covers the entire container
      position: absolute; // Make image fill the container
      top: 0;
      left: 0;
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
    justify-content: space-evenly;
    height: 100%;
    color: $text-color-secondary;

    h2 {
      color: $text-color-primary;
      font-size: 24px; // Larger font size for desktops
    }

    .house-details {
      display: flex;
      flex-direction: column; // Stack details vertically by default
      gap: 8px;
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

// Media query for phones
@media (max-width: 480px) {
  .house-card {
    padding: 16px;
    margin-bottom: 8px;
    gap: 8px;
    height: 150px;

    .houseimage {
      height: 100%;
      width: 40%;
    }

    .action-buttons {
      padding: 10px;
      top: 4px;
      right: 4px;

      .edit-button,
      .delete-button {
        width: 20px;
        height: 20px;
      }

      img {
        width: 16px; // Further reduced size for phones
        height: 16px;
      }
    }

    .houseinfo {
      h2 {
        font-size: 16px; // Further reduced font size for phones
      }

      .house-details {
        gap: 4px; // Further reduced gap for phones
      }

      .detail-item {
        span {
          font-size: 10px; // Further reduced font size for phones
        }
      }
    }
  }
}
</style>
