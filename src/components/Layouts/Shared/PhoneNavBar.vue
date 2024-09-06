<template>
  <div class="phone-navbar">
    <GoBackButton class="go-back-button" :isMobile="isMobile" v-if="isMobile" />
    <div class="action-buttons" v-if="isMobile">
      <!-- Action Buttons -->
      <div class="mobile-action-buttons" v-if="house.madeByMe">
        <router-link
          :to="`/house/edit/${house.id}`"
          class="edit-button"
          @click.stop
        >
          <img src="@/assets/slices/ic_edit_white@3x.png" alt="Edit" />
        </router-link>
        <button class="delete-button" @click="$emit('triggerDelete')">
          <img src="@/assets/slices/ic_delete_white@3x.png" alt="Delete" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import GoBackButton from "@/components/Layouts/UI/GoBackButton.vue";
export default {
  name: "PhoneNavBar",
  components: {
    GoBackButton,
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
    house: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.phone-navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 100;
  padding: 0 10px;

  .action-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .mobile-action-buttons {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    width: 100%;
  }

  .edit-button,
  .delete-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 15px;

    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
