<template>
  <div>
    <div class="pageheader">
      <h1>Houses</h1>
      <FancyButton to="/create" class="fancy-button" :isCreateButton="true"
        >+ CREATE NEW</FancyButton
      >
    </div>

    <HouseList />
  </div>
</template>

<script>
import HouseList from "@/components/Layouts/Shared/HouseList.vue";
import FancyButton from "@/components/Layouts/UI/FancyButton.vue";
export default {
  name: "HousesPage",
  components: {
    HouseList,
    FancyButton,
  },
};
</script>

<style lang="scss" scoped>
.pageheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  h1 {
    margin: 0; // Remove default margin for consistency
  }
}

// Media query for mobile devices
@media (max-width: 480px) {
  .pageheader {
    flex-direction: row;
    margin: 16px 0;

    h1 {
      margin-left: auto;
      margin-right: auto;
      font-size: 24px;
      text-align: center;
    }
  }
}
</style>
