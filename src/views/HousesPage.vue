<template>
  <div>
    <div class="pageheader">
      <h1>Houses</h1>
      <FancyButton to="/create">+ CREATE NEW</FancyButton>
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
  margin: 20px 0px;
}
</style>
