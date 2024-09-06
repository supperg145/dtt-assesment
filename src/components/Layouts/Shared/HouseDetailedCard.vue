<template>
  <div class="house-detailed-card">
    <HouseImage
      :house="house"
      :isMobile="isMobile"
      @triggerDelete="showDeletePopup = true"
      class="houseimage"
    />
    <div class="houseinfo">
      <HouseInfoHeader
        :house="house"
        @triggerDelete="showDeletePopup = true"
        :isMobile="isMobile"
      />
      <LocationInfo :house="house" />
      <HouseSummary :house="house" :formattedPrice="formattedPrice" />
      <HouseDetails :house="house" />
      <HouseDescription :house="house" />
      <DeleteConfirmationPopup
        :isVisible="showDeletePopup"
        @confirm="deleteListing(house.id)"
        @cancel="showDeletePopup = false"
      />
      <p v-if="deleteError" class="error-message">
        {{ deleteError }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import HouseImage from "./Details/HouseImage.vue";
import HouseInfoHeader from "./Details/HouseInfoHeader.vue";
import LocationInfo from "./Details/LocationInfo.vue";
import HouseSummary from "./Details/HouseSummary.vue";
import HouseDetails from "./Details/HouseDetails.vue";
import HouseDescription from "./Details/HouseDescription.vue";
import DeleteConfirmationPopup from "@/components/DeleteConfirmationPopup.vue";
import { useDeleteListing } from "@/composables/useDeleteListing";
import { useMobileDetection } from "@/composables/useMobileDetection";

export default {
  name: "HouseDetailedCard",
  components: {
    HouseImage,
    HouseInfoHeader,
    LocationInfo,
    HouseSummary,
    HouseDetails,
    HouseDescription,
    DeleteConfirmationPopup,
  },
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isMobile } = useMobileDetection(); // Use the mobile detection composable

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

  .houseinfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: $text-color-secondary;
    padding: 32px;
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
    background-color: transparent;

    .houseinfo {
      background-color: $color-background-2;
      z-index: 100;
      margin-top: -70px;
      border-top-left-radius: 30px;
      border-top-right-radius: 0px;
    }
  }
}
</style>
