<template>
  <NavBar />
  <Container>
    <router-view />
  </Container>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Container from "./components/Layouts/AppContainer.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Container,
  },
};
</script>

<style></style>
