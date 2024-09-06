<template>
  <div class="houseinfoheader">
    <h2>{{ house.location.street }} {{ house.location.houseNumber }}</h2>
    <div class="action-buttons" v-if="!isMobile && house.madeByMe">
      <router-link
        :to="`/house/edit/${house.id}`"
        class="edit-button"
        @click.stop
      >
        <img src="@/assets/slices/ic_edit@3x.png" alt="Edit" />
      </router-link>
      <button class="delete-button" @click="$emit('triggerDelete')">
        <img src="@/assets/slices/ic_delete@3x.png" alt="Delete" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseInfoHeader",
  props: {
    house: {
      type: Object,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.houseinfoheader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h2 {
    font-size: 24px;
    margin: 0;
    margin-bottom: 16px;
  }
}

.action-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;

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
  }

  img {
    width: 20px;
    height: 20px;
  }
}

// Media query for smaller screens
@media (max-width: 480px) {
  .houseinfoheader h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }
}
</style>
