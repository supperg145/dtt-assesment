<template>
  <button
    :class="buttonClass"
    @click="handleClick"
    :disabled="disabled"
    :type="buttonType"
  >
    <span class="button-content">
      <img
        v-if="isMobile && isCreateButton"
        src="@/assets/slices/ic_plus_grey@3x.png"
        alt="Create"
      />
      <p v-else><slot></slot></p>
    </span>
  </button>
</template>

<script>
import { useMobileDetection } from "@/composables/useMobileDetection";
import { useRouter } from "vue-router";

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
    isCreateButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { isMobile } = useMobileDetection();
    const router = useRouter();

    const handleClick = (event) => {
      if (props.to) {
        router.push(props.to);
      }
      if (props.onClick) {
        props.onClick(event);
      }
    };

    return {
      isMobile,
      handleClick,
    };
  },
  computed: {
    buttonClass() {
      return {
        "button-primary": this.type === "primary",
        "button-secondary": this.type === "secondary",
        "button-disabled": this.disabled,
        "button-mobile": this.isMobile,
        "is-create-button": this.isCreateButton,
      };
    },
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
    &.is-create-button {
      background-color: transparent;
    }
    .button-content {
      justify-content: center;
      img {
        display: block;
        width: 20px; // Adjust size as needed
        height: 20px;
      }
    }
  }
}
</style>
