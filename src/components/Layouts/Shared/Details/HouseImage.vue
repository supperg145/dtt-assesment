<template>
  <div class="houseimage">
    <PhoneNavBar
      class="phone-navbar"
      :isMobile="isMobile"
      :house="house"
      @triggerDelete="$emit('triggerDelete')"
    />
    <img :src="house.image" alt="House image" />
  </div>
</template>

<script>
import PhoneNavBar from "../PhoneNavBar.vue";

export default {
  name: "HouseImage",
  components: {
    PhoneNavBar,
  },
  props: {
    house: {
      type: Object,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.houseimage {
  flex-shrink: 0;
  width: 100%;
  height: auto;
  overflow: hidden;

  .phone-navbar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
