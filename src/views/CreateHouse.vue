<template>
  <div class="create-house">
    <div class="form-container">
      <h1>Create New Listing</h1>
      <ListingForm />
    </div>
  </div>
</template>

<script>
import ListingForm from "@/components/Layouts/Shared/ListingForm.vue";

export default {
  name: "CreateHouse",
  components: {
    ListingForm,
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
.create-house {
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
