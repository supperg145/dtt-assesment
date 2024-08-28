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
  margin: 20px 0;

  h1 {
    margin: 0; // Remove default margin for consistency
  }
}

// Media query for mobile devices
@media (max-width: 480px) {
  .pageheader {
    flex-direction: column; // Stack elements vertically on mobile
    align-items: flex-start; // Align items to the start on mobile
    margin: 16px 0; // Adjust margin for mobile

    h1 {
      font-size: 24px; // Adjust font size for mobile
    }
  }

  FancyButton {
    display: none; // Hide the FancyButton text on mobile

    &::before {
      content: url("../assets/slices/ic_plus_grey@3x.png"); // Use an image for mobile
      display: block;
      width: 40px; // Adjust width as needed
      height: 40px; // Adjust height as needed
    }
  }
}
</style>
