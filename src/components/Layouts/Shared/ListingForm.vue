<template>
  <form class="listing-form" @submit.prevent="onSubmit">
    <label for="streetName">Street name*</label>
    <input
      v-model="formData.streetName"
      type="text"
      id="streetName"
      placeholder="Enter the street name"
    />

    <div class="address">
      <div class="form-group">
        <label for="house-number">House number*</label>
        <input
          v-model="formData.houseNumber"
          type="text"
          id="house-number"
          placeholder="Enter house number"
        />
      </div>
      <div class="form-group">
        <label for="numberAddition">Addition (optional)</label>
        <input
          v-model="formData.numberAddition"
          type="text"
          id="numberAddition"
          placeholder="e.g. A"
        />
      </div>
    </div>

    <label for="zip">Postal code*</label>
    <input
      v-model="formData.zip"
      type="text"
      id="zip"
      placeholder="e.g. 1000 AA"
    />

    <label for="city">City*</label>
    <input
      v-model="formData.city"
      type="text"
      id="city"
      placeholder="e.g. Amsterdam"
    />

    <label for="image" class="file-upload">
      <p>Upload a picture (PNG or JPG)</p>
      <img src="@/assets/slices/ic_upload@3x.png" alt="Upload Image" />
    </label>
    <input
      type="file"
      id="image"
      accept="image/png, image/jpeg"
      @change="onImageChange"
      style="display: none"
    />

    <label for="price">Price*</label>
    <input
      v-model="formData.price"
      type="text"
      id="price"
      placeholder="e.g. €1000"
    />

    <div class="form-grid">
      <div class="form-group">
        <label for="size">Size*</label>
        <input
          v-model="formData.size"
          type="text"
          id="size"
          placeholder="e.g. 100m²"
        />
      </div>
      <div class="form-group">
        <label for="garage">Garage*</label>
        <select v-model="formData.hasGarage" id="garage">
          <option value="" disabled>Select an option</option>
          <option value="true">Yes</option>
          <!-- Use Boolean values -->
          <option value="false">No</option>
          <!-- Use Boolean values -->
        </select>
      </div>
      <div class="form-group">
        <label for="bedrooms">Bedrooms*</label>
        <input
          v-model="formData.bedrooms"
          type="number"
          id="bedrooms"
          placeholder="Enter amount"
        />
      </div>
      <div class="form-group">
        <label for="bathrooms">Bathrooms*</label>
        <input
          v-model="formData.bathrooms"
          type="number"
          id="bathrooms"
          placeholder="Enter amount"
        />
      </div>
    </div>

    <label for="constructionYear">Construction year*</label>
    <input
      v-model="formData.constructionYear"
      type="number"
      id="constructionYear"
      placeholder="e.g. 1990"
    />

    <label for="description">Description*</label>
    <textarea
      v-model="formData.description"
      id="description"
      placeholder="Enter description"
      rows="5"
    ></textarea>

    <div v-if="globalError" class="error-container">
      <p>{{ globalError }}</p>
    </div>

    <FancyButton :disabled="!isFormValid" buttonType="submit"
      >Submit</FancyButton
    >
  </form>
</template>

<script>
import axios from "axios";
import FancyButton from "../../../components/Layouts/UI/FancyButton.vue";
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useFormValidation } from "@/composables/useFormValidation";

export default {
  name: "ListingForm",
  components: {
    FancyButton,
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
        if (newData) {
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
          console.log("Updated form data:", formData);
        }
      },
      { immediate: true }
    );

    // Reactive state for error messages
    const globalError = ref(null);

    // Form validation
    const isFormValid = useFormValidation(formData);

    // Handle form submission
    const onSubmit = async () => {
      if (isFormValid.value) {
        try {
          const baseUrl = "https://api.intern.d-tt.nl/api/houses";
          let listingId = props.listingData?.id || null;

          // Handle image upload if an image is provided
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
              `${baseUrl}/${listingId || ""}/upload`,
              uploadRequestOptions
            );
            const imageUploadResult = await imageUploadResponse.text();
            console.log("Image upload result:", imageUploadResult);
          }

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
            // Update existing listing
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
            console.log("House updated successfully");
          } else {
            // Create new listing
            response = await axios.post(baseUrl, formDataToSend, {
              headers: {
                "X-Api-Key": process.env.VUE_APP_API_KEY,
                "Content-Type": "multipart/form-data",
              },
            });
            console.log("House created successfully");
          }

          // Get the ID of the newly created or updated listing
          const createdListingId = response.data.id || props.listingData?.id;

          // Redirect to the newly created or updated listing page
          if (createdListingId) {
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
    const onImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        formData.image = file;
        formData.imageName = file.name; // Store the image name
      }
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

label {
  margin-bottom: 8px;
  font-weight: bold;
}

input,
textarea,
select {
  padding: 12px;
  font-size: 14px;
  width: 100%;
  border: none;
  height: 60px;
  border-radius: 8px;
  margin-bottom: 16px;
}

textarea {
  resize: none;
  height: 200px;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-size: 16px;
  background-position: right 12px center;
  background-repeat: no-repeat;
}

.file-upload {
  p {
    margin-bottom: 8px;
  }
  img {
    border: dashed 2px $color-secondary;
    padding: 10px;
  }
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.form-group {
  flex: 1 1 calc(50% - 16px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.address {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.picture-input-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
}

.is-invalid {
  border: 2px solid red;
}

.error-container {
  color: red;
  margin-top: 10px;
}
</style>
