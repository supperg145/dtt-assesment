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
export default {
  name: "SearchField",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleInput() {
      this.$emit("search", this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = ""; // Clear the search query
      this.$emit("search", ""); // Emit empty search term to reset filter
    },
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
