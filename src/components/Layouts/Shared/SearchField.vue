<template>
  <div class="input-container">
    <div class="input-wrapper">
      <button id="search">
        <img src="@/assets/slices/ic_search@3x.png" alt="Search Icon" />
      </button>
      <input
        type="search"
        placeholder="Search for a house"
        v-model="searchQuery"
        @input="handleInput"
      />
      <button id="clear" v-if="searchQuery" @click="clearSearch">
        <img src="@/assets/slices/ic_clear@3x.png" alt="Clear Icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SearchField",
  setup(props, { emit }) {
    const searchQuery = ref(""); // Reactive state for search query

    const handleInput = () => {
      emit("search", searchQuery.value); // Emit search query on input
    };

    const clearSearch = () => {
      searchQuery.value = ""; // Clear the search query
      emit("search", ""); // Emit empty search term to reset filter
    };

    return {
      searchQuery,
      handleInput,
      clearSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/variables";

.input-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-wrapper {
  position: relative;
  width: 50%;

  input {
    padding: 10px 40px 10px 40px;
    width: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: $color-tertiary-light;
  }

  #search,
  #clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;

    img {
      width: 20px;
      height: 20px;
    }
  }

  #search {
    left: 10px;
  }

  #clear {
    right: 10px;
  }
}

@media (max-width: 480px) {
  .input-wrapper {
    width: 100%;
  }
}
</style>
