<template>
  <NavBar v-if="!isMobile" />
  <Container>
    <router-view />
  </Container>
  <PhoneFooter v-if="isMobile" />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Container from "./components/Layouts/AppContainer.vue";
import PhoneFooter from "./components/Layouts/Shared/PhoneFooter.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Container,
    PhoneFooter,
  },
  data() {
    return {
      isMobile: window.innerWidth <= 480,
    };
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 480;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style></style>
