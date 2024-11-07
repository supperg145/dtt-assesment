<template>
  <button @click="goBack">
    <span class="back-icon"></span>
    <div v-if="!isMobile">{{ buttonText }}</div>
  </button>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "GoBackButton",
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const buttonText = computed(() => {
      switch (route.name) {
        case "Home":
          return "Back to Home";
        case "About":
          return "Back to About";
        case "House":
          return "Back to House Overview";
        case "Create":
          return "Back to Home";
        case "Edit":
          return "Back to Listing";
        default:
          return "Go Back";
      }
    });

    const goBack = () => {
      if (route.name === "House") {
        router.push({ name: "Home" });
      } else {
        router.back();
      }
    };

    return { goBack, buttonText };
  },
};
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  margin: 20px 0px;

  .back-icon {
    width: 20px;
    height: 20px;
    background-image: url("../../../assets/slices/ic_back_grey@3x.png");
    background-size: cover;
    display: inline-block;
  }

  @media (max-width: 480px) {
    .back-icon {
      background-image: url("../../../assets/slices/ic_back_white@3x.png");
      background-size: cover;
    }
  }
}
</style>
