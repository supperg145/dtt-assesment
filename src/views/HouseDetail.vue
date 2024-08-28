<template>
  <div class="house-detail">
    <div v-if="house">
      <GoBackButton />
      <HouseDetailedCard :house="house" />
    </div>
    <div v-else>
      <p>Loading house details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import HouseDetailedCard from "../components/Layouts/Shared/HouseDetailedCard.vue";
import GoBackButton from "@/components/Layouts/UI/GoBackButton.vue";

export default {
  name: "HouseDetail",
  components: {
    HouseDetailedCard,
    GoBackButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const house = ref(null);

    const fetchHouseDetails = async (id) => {
      try {
        const houseDetails = await store.dispatch("houses/fetchHouseById", id);
        house.value = houseDetails;
      } catch (err) {
        console.error("Failed to fetch house details:", err);
      }
    };

    onMounted(() => {
      const houseId = route.params.id;
      fetchHouseDetails(houseId);
    });

    return {
      house,
    };
  },
};
</script>

<style scoped>
.house-detail {
  margin-top: 20px;
}
</style>
