import { ref } from "vue";
import { useHousesStore } from "@/stores/housesStore"; // Import your Pinia store
import { useRouter } from "vue-router";

export function useDeleteListing() {
  const housesStore = useHousesStore(); // Use Pinia store
  const router = useRouter();
  const showDeletePopup = ref(false);
  const deleteError = ref(null);

  const deleteListing = async (houseId) => {
    try {
      await housesStore.deleteHouse(houseId); // Use Pinia action for deletion
      showDeletePopup.value = false;

      await router.push("/"); // Navigate back to the main page
    } catch (error) {
      console.error("Failed to delete house:", error);
      deleteError.value = error.message;
    }
  };

  return { showDeletePopup, deleteListing, deleteError };
}
