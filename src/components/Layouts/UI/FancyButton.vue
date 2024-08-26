<template>
  <button
    :class="buttonClass"
    @click="handleClick"
    :disabled="disabled"
    :type="buttonType"
  >
    <slot></slot>
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
  computed: {
    buttonClass() {
      return {
        "button-primary": this.type === "primary",
        "button-secondary": this.type === "secondary",
        "button-disabled": this.disabled,
      };
    },
  },
  methods: {
    handleClick(event) {
      if (this.to) {
        // Handle navigation if `to` prop is provided
        this.$router.push(this.to);
      }
      if (this.onClick) {
        // Call the custom click handler if provided
        this.onClick(event);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

// Base button styling
button {
  background-color: $color-primary;
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
}
</style>
