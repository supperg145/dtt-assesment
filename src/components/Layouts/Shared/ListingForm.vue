<template>
  <form class="listing-form" @submit.prevent="onSubmit">
    <TextInput
      id="streetName"
      label="Street name"
      v-model="formData.streetName"
      placeholder="Enter the street name"
      :hasError="!formData.streetName && globalError"
    />
    <div class="address">
      <NumberInput
        id="house-number"
        label="House number"
        v-model="formData.houseNumber"
        placeholder="Enter house number"
        :hasError="!formData.houseNumber && globalError"
      />
      <TextInput
        id="numberAddition"
        label="Addition (optional)"
        v-model="formData.numberAddition"
        placeholder="e.g. A"
      />
    </div>
    <TextInput
      id="zip"
      label="Postal code"
      v-model="formData.zip"
      placeholder="e.g. 1000 AA"
      :hasError="!formData.zip && globalError"
    />
    <TextInput
      id="city"
      label="City"
      v-model="formData.city"
      placeholder="e.g. Amsterdam"
      :hasError="!formData.city && globalError"
    />

    <!-- Image Upload and Preview -->
    <FileUpload
      id="image"
      label="Upload a picture (PNG or JPG)"
      @file-selected="onImageChange"
      :imageSrc="formData.imagePreview"
    />

    <TextInput
      id="price"
      label="Price"
      v-model="formData.price"
      placeholder="e.g. €1000"
      :hasError="!formData.price && globalError"
    />
    <div class="form-grid">
      <NumberInput
        id="size"
        label="Size"
        v-model="formData.size"
        placeholder="e.g. 100m²"
        :hasError="!formData.size && globalError"
      />
      <SelectInput
        id="garage"
        label="Garage"
        v-model="formData.hasGarage"
        :hasError="globalError"
      />
      <NumberInput
        id="bedrooms"
        label="Bedrooms"
        v-model="formData.bedrooms"
        placeholder="Enter amount"
        :hasError="!formData.bedrooms && globalError"
      />
      <NumberInput
        id="bathrooms"
        label="Bathrooms"
        v-model="formData.bathrooms"
        placeholder="Enter amount"
        :hasError="!formData.bathrooms && globalError"
      />
    </div>
    <NumberInput
      id="constructionYear"
      label="Construction year"
      v-model="formData.constructionYear"
      placeholder="e.g. 1990"
      :hasError="!formData.constructionYear && globalError"
    />
    <TextArea
      id="description"
      label="Description"
      v-model="formData.description"
      placeholder="Enter description"
      :hasError="!formData.description && globalError"
    />
    <ErrorDisplay :error="globalError" />
    <FancyButton :disabled="!isFormValid" buttonType="submit" class="button">Submit</FancyButton>
  </form>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useFormValidation } from "@/composables/useFormValidation";
import FancyButton from "../../../components/Layouts/UI/FancyButton.vue";
import TextInput from "./Listing/TextInput.vue";
import NumberInput from "./Listing/NumberInput.vue";
import FileUpload from "./Listing/FileUpload.vue";
import SelectInput from "./Listing/SelectInput.vue";
import TextArea from "./Listing/TextArea.vue";
import ErrorDisplay from "./Listing/ErrorDisplay.vue";
import { createListing, updateListing, uploadImage } from "@/services/apiService";
import uploadIcon from "../../../assets/slices/ic_upload@3x.png";

export default {
  name: "ListingForm",
  components: {
    FancyButton,
    TextInput,
    NumberInput,
    FileUpload,
    SelectInput,
    TextArea,
    ErrorDisplay,
  },
  props: {
    listingData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const router = useRouter();
    const isEditMode = ref(false);
    const formData = reactive({
      streetName: "",
      houseNumber: "",
      numberAddition: "",
      zip: "",
      city: "",
      image: null,
      imagePreview: "", // To hold the preview of the uploaded image
      price: "",
      size: "",
      hasGarage: false,
      bedrooms: "",
      bathrooms: "",
      constructionYear: "",
      description: "",
    });
    const globalError = ref(null);
    const apiKey = import.meta.env.VITE_APP_API_KEY;

    // Initialize form data if listingData is provided
    watch(
      () => props.listingData,
      (newData) => {
        if (newData && newData.id) {
          isEditMode.value = true;
          Object.assign(formData, {
            streetName: newData.location?.street || "",
            houseNumber: newData.location?.houseNumber || "",
            numberAddition: newData.location?.houseNumberAddition || "",
            zip: newData.location?.zip || "",
            city: newData.location?.city || "",
            price: newData.price || "",
            size: newData.size || "",
            hasGarage: newData.hasGarage || false,
            bedrooms: newData.rooms?.bedrooms || "",
            bathrooms: newData.rooms?.bathrooms || "",
            constructionYear: newData.constructionYear || "",
            description: newData.description || "",
            imagePreview: newData.image || "", // Set the image preview from existing data
          });
        }
      },
      { immediate: true }
    );

    // Form validation
    const { isFormValid } = useFormValidation(formData);

    // Submit form data
    const onSubmit = async () => {
      if (isFormValid.value) {
        try {
          let response;
          const formDataToSend = new FormData();
          Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));

          if (isEditMode.value) {
            response = await updateListing(props.listingData.id, formDataToSend, apiKey);
          } else {
            response = await createListing(formDataToSend, apiKey);
          }

          const createdListingId = response.data.id || props.listingData?.id;

          if (createdListingId) {
            if (formData.image) {
              const imageUploadResponse = await uploadImage(createdListingId, formData.image, apiKey);
              if (!imageUploadResponse.ok) {
                throw new Error("Image upload failed");
              }
            }
            router.push({ name: "House", params: { id: createdListingId } });
          } else {
            router.push({ name: "Home" });
          }
        } catch (error) {
          console.error("Failed to create/update house:", error);
          globalError.value = error.response
            ? `Failed to create/update house: ${error.response.status}, Details: ${JSON.stringify(error.response.data)}`
            : `Failed to create/update house: ${error.message}`;
        }
      } else {
        globalError.value = "Please fill in all required fields.";
      }
    };

    const onImageChange = (file) => {
      formData.image = file;
      // Create a URL for the uploaded image to display as a preview
      formData.imagePreview = URL.createObjectURL(file); // Use the URL.createObjectURL to show the image preview
    };

    return {
      formData,
      globalError,
      isFormValid,
      onSubmit,
      onImageChange,
      uploadIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.listing-form {
  display: flex;
  flex-direction: column;
}

.address {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.button {
  margin-bottom: 20px;
}

.image-preview {
  margin-top: 16px; /* Add margin for separation */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px; /* Optional: to match your design */
  }
}
</style>
