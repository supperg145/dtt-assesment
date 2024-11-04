<template>
  <div class="popup-overlay" v-if="isVisible">
    <div class="popup-content">
      <h1>Delete Listing</h1>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action cannot be undone</p>
      <div class="popup-actions">
        <FancyButton @click.stop="confirm">YES DELETE</FancyButton>
        <FancyButton @click.stop="cancel" class="button-secondary">
          GO BACK
        </FancyButton>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";
import FancyButton from "./Layouts/UI/FancyButton.vue";

export default defineComponent({
  name: "DeleteConfirmationPopup",
  components: {
    FancyButton,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["confirm", "cancel"],
  setup(props, { emit }) {
    const { isVisible } = toRefs(props);

    const confirm = () => {
      emit("confirm");
    };

    const cancel = () => {
      emit("cancel");
    };

    return {
      isVisible,
      confirm,
      cancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .popup-content {
    background-color: $color-background-1;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 50%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    .popup-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 16px;
    }
  }
}
</style>
