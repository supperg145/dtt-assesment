<template>
  <label :for="id" class="file-upload">
    <p>{{ label }}</p>
    <img :src="imageSrc" alt="Upload Image" />
    <input
      type="file"
      :id="id"
      :accept="accept"
      @change="handleFileChange"
      style="display: none"
    />
  </label>
</template>

<script>
export default {
  name: "FileUpload",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      default: "image/png, image/jpeg",
    },
  },
  emits: ["file-selected"],
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.$emit("file-selected", file);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin-bottom: 8px;
  }

  img {
    border: dashed 2px #ccc;
    padding: 10px;
  }
}
</style>
