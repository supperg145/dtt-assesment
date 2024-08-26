export function useFormHandlers(formData, globalError, isFormValid) {
  return () => {
    if (isFormValid.value) {
      console.log("Form submitted:", formData);
    } else {
      globalError.value = "Please fill in all required fields.";
    }
  };
}
