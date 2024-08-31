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
    <FileUpload
      id="image"
      label="Upload a picture (PNG or JPG)"
      @file-selected="onImageChange"
      :imageSrc="require('../../../assets/slices/ic_upload@3x.png')"
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

    <FancyButton :disabled="!isFormValid" buttonType="submit"
      >Submit</FancyButton
    >
  </form>
</template>

<script>
import axios from "axios";
import FancyButton from "../../../components/Layouts/UI/FancyButton.vue";
import TextInput from "./Listing/TextInput.vue";
import NumberInput from "./Listing/NumberInput.vue";
import FileUpload from "./Listing/FileUpload.vue";
import SelectInput from "./Listing/SelectInput.vue";
import TextArea from "./Listing/TextArea.vue";
import ErrorDisplay from "./Listing/ErrorDisplay.vue";
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useFormValidation } from "@/composables/useFormValidation";

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
      price: "",
      size: "",
      hasGarage: false,
      bedrooms: "",
      bathrooms: "",
      constructionYear: "",
      description: "",
    });

    // Watch for changes in listingData to update formData
    watch(
      () => props.listingData,
      (newData) => {
        if (newData && newData.id) {
          isEditMode.value = true;
          formData.streetName = newData.location?.street || "";
          formData.houseNumber = newData.location?.houseNumber || "";
          formData.numberAddition = newData.location?.houseNumberAddition || "";
          formData.zip = newData.location?.zip || "";
          formData.city = newData.location?.city || "";
          formData.price = newData.price || "";
          formData.size = newData.size || "";
          formData.hasGarage = newData.hasGarage || false;
          formData.bedrooms = newData.rooms?.bedrooms || "";
          formData.bathrooms = newData.rooms?.bathrooms || "";
          formData.constructionYear = newData.constructionYear || "";
          formData.description = newData.description || "";
        }
      },
      { immediate: true }
    );

    // Reactive state for error messages
    const globalError = ref(null);

    // Form validation
    const { isFormValid } = useFormValidation(formData);

    // Handle form submission
    const onSubmit = async () => {
      if (isFormValid.value) {
        try {
          const baseUrl = "https://api.intern.d-tt.nl/api/houses";

          // Create FormData object for the listing data
          const formDataToSend = new FormData();
          formDataToSend.append("price", formData.price);
          formDataToSend.append("bedrooms", parseInt(formData.bedrooms));
          formDataToSend.append("bathrooms", parseInt(formData.bathrooms));
          formDataToSend.append("size", parseFloat(formData.size));
          formDataToSend.append("streetName", formData.streetName);
          formDataToSend.append("houseNumber", formData.houseNumber);
          formDataToSend.append("numberAddition", formData.numberAddition);
          formDataToSend.append("zip", formData.zip);
          formDataToSend.append("city", formData.city);
          formDataToSend.append(
            "constructionYear",
            parseInt(formData.constructionYear)
          );
          formDataToSend.append("hasGarage", formData.hasGarage.toString());
          formDataToSend.append("description", formData.description);

          let response;
          if (isEditMode.value) {
            response = await axios.post(
              `${baseUrl}/${props.listingData.id}`,
              formDataToSend,
              {
                headers: {
                  "X-Api-Key": process.env.VUE_APP_API_KEY,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else {
            response = await axios.post(baseUrl, formDataToSend, {
              headers: {
                "X-Api-Key": process.env.VUE_APP_API_KEY,
                "Content-Type": "multipart/form-data",
              },
            });
          }

          const createdListingId = response.data.id || props.listingData?.id;

          if (createdListingId) {
            // Upload image only if there is a valid listing ID
            if (formData.image) {
              const uploadHeaders = new Headers();
              uploadHeaders.append("X-Api-Key", process.env.VUE_APP_API_KEY);

              const formDataForImage = new FormData();
              formDataForImage.append(
                "image",
                formData.image,
                formData.imageName
              );

              const uploadRequestOptions = {
                method: "POST",
                headers: uploadHeaders,
                body: formDataForImage,
                redirect: "follow",
              };

              const imageUploadResponse = await fetch(
                `${baseUrl}/${createdListingId}/upload`,
                uploadRequestOptions
              );
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
            ? `Failed to create/update house: ${
                error.response.status
              }, Details: ${JSON.stringify(error.response.data)}`
            : `Failed to create/update house: ${error.message}`;
        }
      } else {
        globalError.value = "Please fill in all required fields.";
      }
    };

    // Handle image file selection
    const onImageChange = (file) => {
      formData.image = file;
      formData.imageName = file.name;
    };

    return {
      formData,
      globalError,
      isFormValid,
      onSubmit,
      onImageChange,
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
</style>
