import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useDeleteListing() {
  const store = useStore();
  const router = useRouter();
  const showDeletePopup = ref(false);
  const deleteError = ref(null);

  const deleteListing = async (houseId) => {
    try {
      await store.dispatch("houses/deleteHouse", houseId);
      showDeletePopup.value = false;

      await router.push("/");
    } catch (error) {
      console.error("Failed to delete house:", error);
      deleteError.value = error.message;
    }
  };

  return { showDeletePopup, deleteListing, deleteError };
}
