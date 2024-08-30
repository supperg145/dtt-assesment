<template>
  <div class="house-detailed-card">
    <!-- House Image -->
    <div class="houseimage">
      <PhoneNavBar class="phone-navbar" :isMobile="isMobile" :house="house" />
      <img :src="house.image" alt="House image" />
    </div>

    <!-- House Info -->
    <div class="houseinfo">
      <!-- Action Buttons -->
      <div class="houseinfoheader">
        <h2>{{ house.location.street }} {{ house.location.houseNumber }}</h2>
        <div class="action-buttons" v-if="!isMobile && house.madeByMe">
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
      </div>
      <!-- Location -->
      <div class="location detail-item">
        <img src="@/assets/slices/ic_location@3x.png" alt="Location" />
        <span> {{ house.location.zip }} {{ house.location.city }} </span>
      </div>

      <!-- House Summary -->
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

      <!-- House Details -->
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
          <p v-if="house.hasGarage">yes</p>
          <p v-else>no</p>
        </div>
      </div>

      <!-- Detailed Info -->
      <div class="house-detailed-info">
        <p>{{ house.description }}</p>
      </div>

      <!-- Delete Confirmation Popup -->
      <DeleteConfirmationPopup
        :isVisible="showDeletePopup"
        @confirm="deleteListing(house.id)"
        @cancel="showDeletePopup = false"
      />

      <!-- Delete Error -->
      <p v-if="deleteError" class="error-message">
        {{ deleteError }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import DeleteConfirmationPopup from "@/components/DeleteConfirmationPopup.vue";
import { useDeleteListing } from "@/composables/useDeleteListing";
//import GoBackButton from "../UI/GoBackButton.vue";
import PhoneNavBar from "../Shared/PhoneNavBar.vue";

export default {
  name: "HouseDetailedCard",
  components: {
    DeleteConfirmationPopup,
    //GoBackButton,
    PhoneNavBar,
  },
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isMobile = ref(false);
    const formattedPrice = computed(() => {
      return props.house.price.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    });
    const { showDeletePopup, deleteError, deleteListing } = useDeleteListing();
    return {
      formattedPrice,
      showDeletePopup,
      deleteListing,
      deleteError,
      isMobile,
    };
  },

  methods: {
    handleClick() {
      this.$emit("click", this.house.id);
    },

    handleResize() {
      if (window.innerWidth < 480) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },

  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

.house-detailed-card {
  margin-bottom: 16px;
  background-color: $color-background-2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 70%;
  position: relative;

  .houseimage {
    flex-shrink: 0;
    width: 100%;
    height: auto;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .houseinfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: $text-color-secondary;
    padding: 32px;
    width: 100%;

    h2 {
      color: $text-color-primary;
      font-size: 24px;
      margin-bottom: 16px;
    }

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

        p {
          margin: 0;
        }
      }
    }

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

    .house-detailed-info {
      font-size: 16px;
      line-height: 1.5;
      margin-top: 16px;

      p {
        margin: 8px 0;
      }
    }
  }
  .houseinfoheader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .address {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }
  }

  .action-buttons {
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: 8px;

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

  @media (max-width: 480px) {
    width: 100%;
    background-color: transparent;

    .houseinfo {
      padding: 16px;
      background-color: $color-background-2;
      z-index: 100;

      h2 {
        font-size: 20px;
      }

      .house-summary,
      .house-details {
        flex-direction: column;
        align-items: flex-start;
      }

      .detail-item {
        width: 100%;
      }

      .house-summary {
        display: flex;
        flex-direction: row;
      }

      .house-details {
        display: flex;
        flex-direction: row;
      }
    }

    .phone-navbar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
    }
  }
}
</style>
