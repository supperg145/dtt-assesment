<template>
  <button
    :class="buttonClass"
    @click="handleClick"
    :disabled="disabled"
    :type="buttonType"
  >
    <span class="button-content">
      <img
        v-if="isMobile"
        src="@/assets/slices/ic_plus_grey@3x.png"
        alt="Create"
      />
      <p v-else><slot></slot></p>
    </span>
  </button>
</template>

<script>
export default {
  name: "FancyButton",
  props: {
    type: {
      type: String,
      default: "primary",
    },
    to: {
      type: [String, Object],
      default: null,
    },
    onClick: {
      type: Function,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: "button",
    },
  },
  data() {
    return {
      isMobile: window.innerWidth <= 480,
    };
  },
  computed: {
    buttonClass() {
      return {
        "button-primary": this.type === "primary",
        "button-secondary": this.type === "secondary",
        "button-disabled": this.disabled,
        "button-mobile": this.isMobile,
      };
    },
  },
  methods: {
    handleClick(event) {
      if (this.to) {
        this.$router.push(this.to);
      }
      if (this.onClick) {
        this.onClick(event);
      }
    },
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

<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

button {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, opacity 0.3s;

  &.button-primary {
    background-color: $color-primary;
  }

  &.button-secondary {
    background-color: $color-secondary;
  }

  &:disabled {
    background-color: $color-primary;
    cursor: not-allowed;

    &:hover {
      background-color: $color-primary;
    }
  }

  &:hover:not(:disabled) {
    background-color: darken($color-primary, 10%);
  }

  &.button-disabled {
    opacity: 0.6;
  }

  .button-content {
    display: flex;
    align-items: center;
  }

  // Media query for mobile view
  &.button-mobile {
    background-color: transparent; // Remove background color on mobile

    .button-content {
      justify-content: center;
      img {
        display: block;
        width: 20px; // Adjust size as needed
        height: 20px;
      }
      p {
        display: none; // Hide text on mobile
      }
    }
  }
}
</style>
