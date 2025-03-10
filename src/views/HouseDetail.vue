<template>
  <div class="house-detail">
    <div v-if="house">
      <GoBackButton class="go-back" v-if="!isMobile" />
      <!-- House Detailed Card -->
      <HouseDetailedCard :house="house" />
    </div>
    <div v-else>
      <p>Loading house details...</p>
    </div>

    <!-- Delete Confirmation Popup -->
    <DeleteConfirmationPopup
      :isVisible="showDeletePopup"
      @confirm="deleteListing(house.id)"
      @cancel="showDeletePopup = false"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHousesStore } from "@/stores/housesStore"; // Import Pinia store
import HouseDetailedCard from "../components/Layouts/Shared/HouseDetailedCard.vue";
import GoBackButton from "@/components/Layouts/UI/GoBackButton.vue";
import DeleteConfirmationPopup from "@/components/DeleteConfirmationPopup.vue";
import { useMobileDetection } from "@/composables/useMobileDetection";

export default {
  name: "HouseDetail",
  components: {
    HouseDetailedCard,
    GoBackButton,
    DeleteConfirmationPopup,
  },
  setup() {
    const housesStore = useHousesStore(); // Use Pinia store
    const route = useRoute();
    const house = ref(null);
    const showDeletePopup = ref(false);
    const deleteError = ref(null);
    const { isMobile } = useMobileDetection();

    const fetchHouseDetails = async (id) => {
      try {
        await housesStore.fetchHouseById(id); // Use Pinia action
        house.value = housesStore.house; // Access the house directly from the store
      } catch (err) {
        console.error("Failed to fetch house details:", err);
      }
    };

    const deleteListing = async (id) => {
      try {
        await housesStore.deleteHouse(id); // Use Pinia action
        house.value = null;
        showDeletePopup.value = false;
      } catch (err) {
        deleteError.value = "Failed to delete the house.";
        console.error("Failed to delete house:", err);
      }
    };

    onMounted(() => {
      const houseId = route.params.id;
      fetchHouseDetails(houseId);
    });

    return {
      house,
      isMobile,
      showDeletePopup,
      deleteError,
      deleteListing,
    };
  },
};
</script>

<style lang="scss" scoped>
.house-detail {
  position: relative;
  width: 100%;
}
</style>
