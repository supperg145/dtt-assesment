<template>
  <div class="create-house">
    <GoBackButton />
    <div class="form-container">
      <h1>Create New Listing</h1>
      <ListingForm />
    </div>
  </div>
</template>

<script>
import ListingForm from "@/components/Layouts/Shared/ListingForm.vue";
import GoBackButton from "@/components/Layouts/UI/GoBackButton.vue";

export default {
  name: "CreateHouse",
  components: {
    ListingForm,
    GoBackButton,
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
  flex-direction: column;
  justify-content: left;
  align-items: left;
  box-sizing: border-box;

  .form-container {
    max-width: 600px;
    width: 100%;
  }

  h1 {
    margin-bottom: 20px;
  }
}
</style>
