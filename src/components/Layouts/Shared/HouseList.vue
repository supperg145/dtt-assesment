<template>
  <div>
    <div class="filter">
      <SearchField @search="handleSearch" />
      <ToggleButton @filter-changed="handleFilterChange" />
    </div>
    <div v-if="loading">Loading houses...</div>
    <div v-else-if="error">Failed to load houses: {{ error.message }}</div>
    <div v-else>
      <!-- Show results info if there are results and there is a search query -->
      <div v-if="searchQuery && filteredHouses.length > 0" class="results-info">
        <p>{{ numberOfHouses }} house(s) found</p>
      </div>

      <!-- Show NoResults component if there are no results and there is a search query -->
      <NoResults v-if="searchQuery && filteredHouses.length === 0" />

      <!-- Show HouseCard for filtered houses -->
      <HouseCard
        v-for="house in filteredHouses"
        :key="house.id"
        :house="house"
        @click="navigateToHouse(house.id)"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import HouseCard from "./HouseCard.vue";
import ToggleButton from "./ToggleButton.vue";
import SearchField from "./SearchField.vue";
import NoResults from "../../../views/NoResults.vue";

export default {
  name: "HouseList",
  components: {
    HouseCard,
    ToggleButton,
    SearchField,
    NoResults,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const houses = computed(() => store.getters["houses/getHouses"]);
    const loading = ref(true);
    const error = ref(null);
    const filter = ref("price");
    const searchQuery = ref("");

    const filteredHouses = computed(() => {
      let filtered = houses.value;

      // Apply search filter
      if (searchQuery.value) {
        filtered = filtered.filter((house) => {
          const search = searchQuery.value.toLowerCase();
          return (
            house.location.street.toLowerCase().includes(search) ||
            house.location.city.toLowerCase().includes(search) ||
            house.location.zip.toLowerCase().includes(search) ||
            house.price.toString().includes(search) ||
            house.size.toString().includes(search)
          );
        });
      }

      // Apply sorting based on filter
      if (filter.value === "price") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      } else if (filter.value === "size") {
        filtered = filtered.sort((a, b) => b.size - a.size);
      }

      return filtered;
    });

    const numberOfHouses = computed(() => filteredHouses.value.length);

    const handleFilterChange = (newFilter) => {
      filter.value = newFilter;
    };

    const handleSearch = (query) => {
      searchQuery.value = query;
      console.log(searchQuery.value);
    };

    const navigateToHouse = (houseId) => {
      router.push({ name: "House", params: { id: houseId } });
    };

    onMounted(async () => {
      try {
        await store.dispatch("houses/fetchHouses");
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    });

    return {
      filteredHouses,
      numberOfHouses,
      loading,
      error,
      handleFilterChange,
      handleSearch,
      searchQuery,
      navigateToHouse,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.results-info {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}
</style>
