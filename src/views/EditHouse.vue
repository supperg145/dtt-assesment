<template>
  <div>
    <GoBackButton :isMobile="isMobile" />
    <div class="edit-house">
      <div class="form-container">
        <h1>Edit House</h1>
        <ListingForm :listingData="existingListing" />
      </div>
    </div>
  </div>
</template>

<script>
import GoBackButton from "@/components/Layouts/UI/GoBackButton.vue";
import ListingForm from "@/components/Layouts/Shared/ListingForm.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
export default {
  components: {
    ListingForm,
    GoBackButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const existingListing = ref(null);

    const fetchListing = async () => {
      try {
        const listingId = route.params.id;
        const house = await store.dispatch("houses/fetchHouseById", listingId);
        existingListing.value = house;
      } catch (err) {
        console.error("Failed to fetch listing:", err);
      }
    };

    onMounted(() => {
      fetchListing();
    });

    return {
      existingListing,
    };
  },
  mounted() {
    document.body.classList.add("create-house-bg");
  },
  beforeUnmount() {
    document.body.classList.remove("create-house-bg");
  },
};
</script>

<style lang="scss" scoped>
.edit-house {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;

  .form-container {
    padding: 20px;
    max-width: 600px;
    width: 100%;
  }

  h1 {
    margin-bottom: 20px;
  }
}
</style>
