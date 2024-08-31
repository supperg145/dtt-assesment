import { computed } from "vue";

export function useFormValidation(formData) {
  // Define required fields
  const requiredFields = [
    "streetName",
    "houseNumber",
    "zip",
    "city",
    "price",
    "size",
    "bedrooms",
    "bathrooms",
    "constructionYear",
    "description",
  ];

  const isFormValid = computed(() => {
    // Check if all required fields are filled
    return requiredFields.every(
      (field) =>
        formData[field] !== "" &&
        formData[field] !== null &&
        formData[field] !== undefined
    );
  });

  return {
    isFormValid,
  };
}
