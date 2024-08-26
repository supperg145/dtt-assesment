<template>
  <div class="toggle-switch">
    <input
      type="checkbox"
      id="switch"
      v-model="isPrice"
      @change="handleChange"
    />
    <label for="switch">
      <span class="slider"></span>
      <span class="labels">Price</span>
      <span class="labels">Size</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "ToggleButton",
  data() {
    return {
      isPrice: true, // Default value
    };
  },
  methods: {
    handleChange() {
      this.$emit("filter-changed", this.isPrice ? "price" : "size");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/_variables.scss";

.toggle-switch {
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    width: 360px;
    height: 40px;
    background-color: $color-tertiary-dark;
    border-radius: 10px;
    color: white;

    .slider {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background-color: $color-primary;
      border-radius: 10px;
      transition: transform 0.3s;
    }

    .labels {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50%;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }

    .labels:first-of-type {
      left: 0;
    }

    .labels:last-of-type {
      right: 0;
    }
  }

  input[type="checkbox"]:checked + label .slider {
    transform: translateX(100%);
  }
}
</style>
