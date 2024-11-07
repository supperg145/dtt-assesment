<template>
  <div class="navbar header">
    <nav class="container">
      <router-link to="/">
        <img src="../assets/slices/img_logo_dtt@3x.png" alt="logo" />
      </router-link>
      <router-link to="/" class="nav-link" active-class="nav-link-active">
        Houses
      </router-link>
      <router-link to="/about" class="nav-link" active-class="nav-link-active">
        About
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/_variables";

.navbar {
  background-color: $color-background-2;
  padding: 20px 0;

  nav {
    display: flex;

    .nav-link {
      color: $text-color-secondary;
      text-decoration: none;
      margin-left: 20px;
      opacity: 0.4;
      position: relative;
      padding-bottom: 4px;

      &:hover {
        opacity: 1;
      }

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: $text-color-primary;
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.3s ease;
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }

      &.nav-link-active {
        font-weight: $font-weight-bold;
        color: $text-color-primary;
        opacity: 1;
      }
    }
  }
}

img {
  height: 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
