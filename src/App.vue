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
import { useMobileDetection } from "./composables/useMobileDetection";

export default {
  name: "App",
  components: {
    NavBar,
    Container,
    PhoneFooter,
  },
  setup() {
    const { isMobile } = useMobileDetection();
    return { isMobile };
  },
};
</script>

<style></style>
