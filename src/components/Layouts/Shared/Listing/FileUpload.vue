<template>
  <div class="file-upload">
    <label :for="id" class="file-label">{{ label }}</label>
    <input
      type="file"
      :id="id"
      accept="image/png, image/jpeg"
      @change="handleFileUpload"
      hidden
    />
    <div class="upload-area" @click="triggerFileInput">
      <img
        :src="imageSrc || uploadIcon"
        alt="Upload Icon"
        class="upload-icon"
      />
      <span class="upload-text">Click or drag to upload</span>
    </div>
    <ErrorDisplay v-if="error" :error="error" />
  </div>
</template>

<script>
import { ref } from "vue";
import ErrorDisplay from "./ErrorDisplay.vue";
import uploadIcon from "@/assets/slices/ic_upload@3x.png";

export default {
  name: "FileUpload",
  components: {
    ErrorDisplay,
  },
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
      default: "",
    },
  },
  setup(props, { emit }) {
    const error = ref("");

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        emit("file-selected", file);
        error.value = ""; // Clear error if the file is valid
      } else {
        error.value = "Invalid file type. Please upload a PNG or JPG.";
      }
    };

    const triggerFileInput = () => {
      const fileInput = document.getElementById(props.id);
      if (fileInput) {
        fileInput.click();
      }
    };

    return {
      handleFileUpload,
      triggerFileInput,
      uploadIcon,
      error,
    };
  },
};
</script>

<style scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.file-label {
  margin-bottom: 8px;
  font-weight: bold;
}

.upload-area {
  display: flex;
  width: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: border 0.3s;
}

.upload-area:hover {
  border: 2px dashed #007bff;
}

.upload-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 14px;
  color: #777;
}
</style>
