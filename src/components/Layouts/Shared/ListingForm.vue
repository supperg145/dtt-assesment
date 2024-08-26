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

    <label for="image">Upload a picture (PNG or JPG)*</label>
    <input
      type="file"
      id="image"
      accept="image/png, image/jpeg"
      @change="onImageChange"
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
import FancyButton from "../../../components/Layouts/UI/FancyButton.vue";
import { ref, reactive } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "ListingForm",
  components: {
    FancyButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = reactive({
      streetName: "", // Default value, will be set by user
      houseNumber: "",
      numberAddition: "",
      zip: "",
      city: "",
      image: null, // Image will be handled separately
      price: "", // Start with an empty string or a default value
      size: "",
      hasGarage: false, // Use Boolean for dynamic options
      bedrooms: "",
      bathrooms: "",
      constructionYear: "",
      description: "", // Start with an empty string
    });
    //Reactive state for error messages
    const globalError = ref(null);

    //Form validation
    const isFormValid = useFormValidation(formData);

    //Form submit/

    const onSubmit = async () => {
      if (isFormValid.value) {
        try {
          console.log("Submitting form data", formData);

          const formDataToSend = new FormData();
          // Append form data
          formDataToSend.append("price", formData.price);
          formDataToSend.append("bedrooms", formData.bedrooms);
          formDataToSend.append("bathrooms", formData.bathrooms);
          formDataToSend.append("size", formData.size);
          formDataToSend.append("streetName", formData.streetName);
          formDataToSend.append("houseNumber", formData.houseNumber);
          formDataToSend.append("numberAddition", formData.numberAddition);
          formDataToSend.append("zip", formData.zip);
          formDataToSend.append("city", formData.city);
          formDataToSend.append("constructionYear", formData.constructionYear);
          formDataToSend.append("hasGarage", formData.hasGarage.toString());
          formDataToSend.append("description", formData.description);
          formDataToSend.append("image", formData.image);

          // Call the Vuex action
          await store.dispatch("houses/createHouse", formDataToSend);

          console.log("House created successfully");

          // Redirect to the listing page
          router.push({ name: "Home" });
        } catch (error) {
          console.error("Failed to create house:", error);
          globalError.value = error.response
            ? `Failed to create house: ${
                error.response.status
              }, Details: ${JSON.stringify(error.response.data)}`
            : `Failed to create house: ${error.message}`;
        }
      } else {
        globalError.value = "Please fill in all required fields.";
      }
    };
    //Picture input

    const onImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file); // Debugging statement
        formData.image = file;
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

.picture-input-container {
  margin-bottom: 16px;
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
