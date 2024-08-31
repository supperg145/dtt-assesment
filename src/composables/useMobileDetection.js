// src/composables/useMobileDetection.js
import { ref, onMounted, onUnmounted } from "vue";

export function useMobileDetection() {
  const isMobile = ref(window.innerWidth <= 480);

  const handleResize = () => {
    isMobile.value = window.innerWidth <= 480;
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return { isMobile };
}
