<template>
  <div class="phone-footer">
    <div class="footer-content">
      <router-link to="/">
        <img :src="isHomeActive ? homeActiveIcon : homeIcon" alt="Home" />
      </router-link>
      <router-link to="/about">
        <img :src="isAboutActive ? aboutActiveIcon : aboutIcon" alt="About" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import homeIcon from "@/assets/slices/ic_mobile_navigarion_home@3x.png";
import homeActiveIcon from "@/assets/slices/ic_mobile_navigarion_home_active@3x.png";
import aboutIcon from "@/assets/slices/ic_mobile_navigarion_info@3x.png";
import aboutActiveIcon from "@/assets/slices/ic_mobile_navigarion_info_active@3x.png";

export default {
  name: "PhoneFooter",
  setup() {
    const route = useRoute();

    // Reactive icon references
    const icons = {
      homeIcon,
      homeActiveIcon,
      aboutIcon,
      aboutActiveIcon,
    };

    // Computed properties to determine active states
    const isHomeActive = computed(() => route.path === "/");
    const isAboutActive = computed(() => route.path === "/about");

    return {
      ...icons,
      isHomeActive,
      isAboutActive,
    };
  },
};
</script>
  data() {
    return {
      homeIcon,
      homeActiveIcon,
      aboutIcon,
      aboutActiveIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.phone-footer {
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: $color-background-2;
  height: 50px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;

  .footer-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 100px;

    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
