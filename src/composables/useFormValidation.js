import { computed } from "vue";

export function useFormValidation(formData) {
  return computed(() => {
    return (
      formData.streetName &&
      formData.houseNumber &&
      formData.zip &&
      formData.city &&
      formData.price &&
      formData.size &&
      formData.hasGarage !== undefined &&
      formData.bedrooms &&
      formData.bathrooms &&
      formData.constructionYear &&
      formData.description
    );
  });
}
